export interface LoginModel {
    account: string;
    password: string;
}


export interface TokenModel  {
    refreshToken: string | null;
    accountId: string;
}