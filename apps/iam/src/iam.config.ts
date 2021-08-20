import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class IamConfig {
  constructor(
    private readonly configService: ConfigService,
  ) {
  }

  public get jwtSecret(): string {
    return this.configService.get<string>("jwt_secret");
  }

  public get jwtIssuer(): string {
    return this.configService.get<string>("jwt_issuer");
  }

  public get jwtMaxAgeSeconds(): number {
    return this.configService.get<number>("jwt_max_age_seconds");
  }
}
