import StorageName from "../constants/storageName";


// 將 token 存到 localStorage
const setAuthToken = (token: string) => {
    localStorage.setItem(StorageName.TOKEN_NAME, token);
};


// 從 localStorage 讀取 token
const getAuthToken = (): string | null => {
    return localStorage.getItem(StorageName.TOKEN_NAME);
};

// 將 refreshToken 存到 localStorage
const setRefreshToken = (refreshToken: string) => {
    localStorage.setItem(StorageName.REFRESH_TOKEN_NAME, refreshToken);
};


// 從 localStorage 讀取 refreshToken
const getRefreshToken = (): string | null => {
    return localStorage.getItem(StorageName.REFRESH_TOKEN_NAME);
};

// 將 refreshToken 存到 localStorage
const setUserInfo = (data: any) => {
    localStorage.setItem(StorageName.USER_INFO, JSON.stringify(data));
};

// 從 localStorage 讀取 refreshToken
const getUserInfo = (): any => {
    let info = localStorage.getItem(StorageName.USER_INFO);
    let data = {};
    if (info) {
        data = JSON.parse(info);
    }
    return data;
};

/** 清除使用者資訊 */
const removeUserInfo = () => {
    const lang = localStorage.getItem(StorageName.ESG_LANG) || '';
    localStorage.clear();
    localStorage.setItem(StorageName.ESG_LANG, lang);
}

const TokenService = {
    setAuthToken,
    getAuthToken,
    setRefreshToken,
    getRefreshToken,
    setUserInfo,
    getUserInfo,
    removeUserInfo
};

export default TokenService;