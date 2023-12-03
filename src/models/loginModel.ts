export interface LoginModel {
    account: string;
    password: string;
}


export interface RefreshTokenModel {
    refreshToken: string | null;
    accountId: string;
}

export interface UserInfoModel {
    access_token: string;
    account: string;
    companies: any[];
    ctype: string;
    customerId: string;
    id: string;
    hasProduct: boolean;
    isAgreePrivacy: boolean;
    isResetPassword: boolean;
    name: string;
    permission: any;
    platform: number;
    profileName: string;
    profilePath: string;
    refresh_token: string;
    status: number;
    subId: string;
    suppliers: any[];
    taxId: string;
}