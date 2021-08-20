import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { FindConditions, Repository } from "typeorm";
import { PasswordHelper } from "../shared/helpers/password.helper";
import { JwtService } from "@nestjs/jwt";
import { IamConfig } from "../iam.config";
import { LoginInput, LoginOutput } from "@iam/iam-client/models/dto/login.dto";
import { RegisterInput, RegisterOutput } from "@iam/iam-client/models/dto/register.dto";
import { GetUserInput, GetUserOutput } from "@iam/iam-client/models/dto/get-user.dto";
import {
  ValidateJwtTokenInput,
  ValidateJwtTokenOutput,
} from "@iam/iam-client/models/dto/validate-jwt-token.dto";
import { JwtPayload } from "@iam/iam-client/models/shared/jwt-payload";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly config: IamConfig,
  ) {
  }

  async login(input: LoginInput): Promise<LoginOutput> {
    // find the user
    const userEntity = await this._getUserBy({ email: input.email });

    // check the password
    if (!PasswordHelper.instance.verify(input.password, userEntity.password))
      throw new UnauthorizedException("Wrong credentials");

    // generate a JWT token
    const jwtToken = await this._createJwtTokenForUser(userEntity);

    return {
      jwtToken,
    };
  }

  async register(input: RegisterInput): Promise<RegisterOutput> {
    // passwords must match
    if (input.password !== input.confirmPassword)
      throw new BadRequestException("Passwords do not match");

    // email is unique
    const usernameExists: boolean = await this.userRepository.count({
      email: input.email,
    }) > 0;
    if (usernameExists)
      throw new ConflictException("User Name already exists");

    // hash password
    const password = PasswordHelper.instance.hash(input.password);

    // create and store the user entity
    const userEntity: UserEntity = {
      role: "EMPLOYEE",
      email: input.email,
      password: password,
      name: input.name,
      id: 0,
    };
    await this.userRepository.insert(userEntity);

    // generate a JWT token
    const jwtToken = await this._createJwtTokenForUser(userEntity);

    return {
      jwtToken,
    };
  }

  async getUser(input: GetUserInput): Promise<GetUserOutput> {
    // find the user
    const userEntity = await this._getUserBy({ id: input.id });

    return {
      id: userEntity.id,
      name: userEntity.name,
      role: userEntity.role,
      email: userEntity.email,
    };
  }

  async validateJwtToken(input: ValidateJwtTokenInput): Promise<ValidateJwtTokenOutput> {
    // parse the token
    const payload = await this._validateJwtToken(input.jwtToken);

    if (!payload)
      throw new ForbiddenException("Invalid Token!");

    // load the user
    const userEntity = await this._getUserBy({ id: +payload.sub });

    return {
      id: userEntity.id,
      name: userEntity.name,
      role: userEntity.role,
      email: userEntity.email,
    };
  }

  private async _getUserBy(criteria: FindConditions<UserEntity>): Promise<UserEntity> {
    const userEntity: UserEntity = await this.userRepository.findOne(criteria);

    if (!userEntity)
      throw new UnauthorizedException("Wrong credentials");

    return userEntity;
  }

  private async _validateJwtToken(token: string): Promise<JwtPayload | null> {
    let payload: JwtPayload = null;

    try {
      payload = await this.jwtService.verifyAsync(token, {
        ignoreExpiration: false,
        issuer: this.config.jwtIssuer,
        secret: this.config.jwtSecret,
      });
    } catch (e) {
    }

    return payload ?? null;
  }

  private _createJwtTokenForUser(userEntity: UserEntity): Promise<string> {
    return this._createJwtToken(userEntity.id.toString(), {
      role: userEntity.role,
      name: userEntity.name,
      email: userEntity.email,
    });
  }

  private _createJwtToken(subject: string, payloadData: unknown): Promise<string> {
    return this.jwtService.signAsync({
      data: payloadData,
    }, {
      expiresIn: `${this.config.jwtMaxAgeSeconds}s`,
      subject: subject,
      issuer: this.config.jwtIssuer,
      secret: this.config.jwtSecret,
    });
  }
}
