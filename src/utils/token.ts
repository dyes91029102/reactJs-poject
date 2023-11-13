import { REFRESH_TOKEN_NAME, TOKEN_NAME, USER_INFO } from "../constants/storageName";


// 將 token 存到 localStorage
export const setAuthToken = (token: string) => {
    localStorage.setItem(TOKEN_NAME, token);
};


// 從 localStorage 讀取 token
export const getAuthToken = (): string | null => {
    return localStorage.getItem(TOKEN_NAME);
};

// 將 refreshToken 存到 localStorage
export const setRefreshToken = (refreshToken: string) => {
    localStorage.setItem(REFRESH_TOKEN_NAME, refreshToken);
};


// 從 localStorage 讀取 refreshToken
export const getRefreshToken = (): string| null => {
    return localStorage.getItem(REFRESH_TOKEN_NAME);
};

// 將 refreshToken 存到 localStorage
export const setUserInfo = (data: any) => {
    localStorage.setItem(USER_INFO, JSON.stringify(data));
};

// 從 localStorage 讀取 refreshToken
export const getUserInfo = (): any => {
    let info = localStorage.getItem(USER_INFO);
    let data = {};
    if (info) {
        data = JSON.parse(info);
    }
    return data;
};