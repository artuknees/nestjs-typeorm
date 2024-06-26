export interface PayloadToken {
  role: string;
  sub: number;
  // agrego estos dos que siempre vienen en el token
  iat?: number;
  exp?: number;
}
