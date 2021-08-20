import * as bcrypt from "bcrypt";

export class PasswordHelper {

  public static instance: PasswordHelper = new PasswordHelper();

  protected constructor() {
  }

  public hash(plainPassword: string): string {
    return bcrypt.hashSync(plainPassword, 10);
  }

  public verify(plainPassword: string, password: string): boolean {
    return bcrypt.compareSync(plainPassword, password);
  }
}
