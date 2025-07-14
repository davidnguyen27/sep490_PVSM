export interface User {
  email: string;
  role: number;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiration: string;
  refreshTokenExpiration: string;
  isVerify: boolean;
}
