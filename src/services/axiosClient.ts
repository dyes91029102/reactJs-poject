import axios from 'axios';
import TokenService from './auth/tokenService';
import loginService from './login/loginService';

// api 基礎設置
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = TokenService.getAuthToken();
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

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // const navigate = useNavigate();
    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {

        if (!refreshPromise) {
          // 取得refresh token
          const userInfo = TokenService.getUserInfo();
          if (userInfo) {
            refreshPromise = loginService.tokenRefresh({
              refreshToken: userInfo.refresh_token,
              accountId: userInfo.id
            }).finally(clearPromise);
          }
        }
        const data = await refreshPromise;
        const token = data.data.access_token;
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

export default axiosClient;