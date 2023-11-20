import { LoginModel, RefreshTokenModel } from "../../models/loginModel";
import { GET, POST } from "../httpClient";

/** 登入 */
const login = (model: LoginModel) => {
    return POST('login/login', model);
}

/** 登出 */
const logout = () => {
    return POST('login/logout');
}

/** 註銷refresh token */
const tokenRevoke = () => {
    return GET('login/token/revoke');
}

/** 註銷refresh token */
const tokenRefresh = (model:RefreshTokenModel) => {
    return POST('login/token/refresh', model);
}


const LoginService = {
    login,
    logout,
    tokenRevoke,
    tokenRefresh
}

export default LoginService;