import { BASE_URL } from "../constants/base";
import { LoginModel, TokenModel } from "../models/loginModel";
import api from "../utils/api";
import TokenService from "./token.service";

/** 登入 */ 
const login = (model:LoginModel) => {
    return api.post(`${BASE_URL}/login/login`, model).then((res) => res.data);
};

/** 登出 */ 
const logout = () => {
    return api.post(`${BASE_URL}/login/logout`).then((res) => res.data);
};


/** refresh token */ 
const refresh = (model:TokenModel) => {
    return api.post(`${BASE_URL}/login/token/refresh`, model).then((res) => res.data);
};
// 身分驗證
const getMe = () => {
    // 從 localStorage 讀取 token
    const token = TokenService.getAuthToken();
    return fetch(`${BASE_URL}/me`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
};

const LoginService = {
    login,
    refresh,
    logout
}

export default LoginService;