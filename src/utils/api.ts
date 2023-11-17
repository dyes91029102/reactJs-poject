import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/base';
import TokenService from '../services/token.service';
import LoginService from '../services/login.service';

// api 基礎設置
const api = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = TokenService.getAuthToken();
    console.log(token)
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

let refreshPromise: any = null;
const clearPromise = () => {
  refreshPromise = null;
}

/** 重新取得token */
const refreshToken = async () => {
  // 取得refresh token
  const userInfo = TokenService.getUserInfo();
  const response = await LoginService.refresh({
    refreshToken: userInfo.refresh_token,
    accountId: userInfo.id
  })
  console.log(response);
  return response.data.access_token;
}

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log('originalRequest', originalRequest);
    // const navigate = useNavigate();
    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {

        if (!refreshPromise) {
          refreshPromise = refreshToken().finally(clearPromise);
        }
        const token = await refreshPromise;
        TokenService.setAuthToken(token);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);

      } catch (error) {
        // Handle refresh token error or redirect to login
      }
    }

    // 403 錯誤
    if (error.response.status === 403 && !originalRequest._retry) {
      alert('無此權限');
      // navigate('/login');
    }

    return Promise.reject(error);
  }
);


export default api;