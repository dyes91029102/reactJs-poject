export interface LoginModel {
    account: string;
    password: string;
}


export interface RefreshTokenModel  {
    refreshToken: string | null;
    accountId: string;
}