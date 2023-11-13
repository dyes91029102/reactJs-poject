import { BASE_URL } from "../constants/base";
import { getAuthToken } from "../utils/token";

// 登入
export const login = (username: string, password: string) => {
    return fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    }).then((res) => res.json());
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