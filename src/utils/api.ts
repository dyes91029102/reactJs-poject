import axios from 'axios';
import { BASE_URL } from '../constants/base';
import { getAuthToken, getRefreshToken, getUserInfo, setAuthToken } from './token';
import { refresh } from '../services/loginService';


// api 基礎設置
const api = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    // 無token 就用空的
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // 
      config.headers.Authorization = null;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 取得refresh token
        const userInfo = getUserInfo();
        console.log(userInfo);
        // 取得新的token
        refresh({
          refreshToken: userInfo.refreshToken,
          accountId: userInfo.accountId
        }).then(x => {
          if (x.success) {

            const token = x.access_token;
            setAuthToken(token);

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          }
        });


      } catch (error) {
        // Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error);
  }
);


export default api;