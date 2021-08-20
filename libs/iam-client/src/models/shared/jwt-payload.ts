export interface JwtPayload {
  data: any;
  // issued at
  iat: number;
  // expire
  exp: number;
  // issuer
  iss: string;
  // subject
  sub: string;
}
