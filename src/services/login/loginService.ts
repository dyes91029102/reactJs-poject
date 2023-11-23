import { LoginModel, RefreshTokenModel } from "../../models/loginModel";
import { HttpClient } from "../httpClient";

const httpClient = new HttpClient();

/** 登入 */
const login = (model: LoginModel) => {
    return httpClient.post('login/login', model);
}

/** 登出 */
const logout = () => {
    return httpClient.post('login/logout');
}

/** 註銷refresh token */
const tokenRevoke = () => {
    return httpClient.get('login/token/revoke');
}

/** 註銷refresh token */
const tokenRefresh = (model:RefreshTokenModel) => {
    return httpClient.post('login/token/refresh', model);
}


const LoginService = {
    login,
    logout,
    tokenRevoke,
    tokenRefresh
}

export default LoginService;