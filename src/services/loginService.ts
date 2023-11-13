import { BASE_URL } from "../constants/base";
import { LoginModel, TokenModel } from "../models/loginModel";
import api from "../utils/api";
import { getAuthToken } from "../utils/token";

/** 登入 */ 
export const login = (model:LoginModel) => {
    return api.post(`${BASE_URL}/login/login`, model).then((res) => res.data);
};

/** refresh token */ 
export const refresh = (model:TokenModel) => {
    return api.post(`${BASE_URL}/login/token/refresh`, model).then((res) => res.data);
};
// 身分驗證
export const getMe = () => {
    // 從 localStorage 讀取 token
    const token = getAuthToken();
    return fetch(`${BASE_URL}/me`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
};