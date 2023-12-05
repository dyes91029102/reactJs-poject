import axios, { AxiosResponse } from "axios";
import React, { useLayoutEffect, useState } from "react";
import { useEffect } from "react";
import TokenService from "../services/auth/tokenService";
import loginService from "../services/login/loginService";
import { BaseResponse } from "../models/baseModel";
import { useNavigate } from "react-router-dom";
import useUserInfoStore from "../state/useUserInfoStore";

// axios instance
const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

interface AxiosInterceptorProps {
    children: React.ReactNode
}

const AxiosInterceptor = (props: AxiosInterceptorProps) => {
    const userInfo = useUserInfoStore(state => state.userInfo);
    // 畫面渲染前先跑
    useLayoutEffect(() => {
        console.log("interceptor");
        const reqInterceptor = (config: any) => {
            const token = userInfo?.access_token;
            // 無token 就用空的
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                // 
                config.headers.Authorization = null;
            }
            return config;
        };

        const resInterceptor = (response: AxiosResponse) => {
            console.log("resInterceptor");
            // 這邊就取出資料層
            return response.data;
        };

        let refreshPromise: any = null;
        const clearPromise = () => {
            refreshPromise = null;
        }

        const errInterceptor = async (error: any) => {
            console.log("errInterceptor", error);
            console.log(error.response.status)
            const originalRequest = error.config;
            // 401 錯誤
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {

                    if (!refreshPromise) {
                        // 取得refresh token
                        if (userInfo?.refresh_token) {
                            refreshPromise = loginService.tokenRefresh({
                                refreshToken: userInfo?.refresh_token,
                                accountId: userInfo?.id
                            }).finally(clearPromise);

                        }
                    }
                    const data = await refreshPromise;
                    const token = data.data.access_token;
                    TokenService.setAuthToken(token);

                    // Retry the original request with the new token
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return (await axios(originalRequest)).data;

                } catch (error) {
                    // Handle refresh token error or redirect to login
                }
            }
            // 403 錯誤
            if (error.response.status === 403 && !originalRequest._retry) {
                alert('無此權限');

            }

            return Promise.reject(error);
        };


        // 攔截器request
        const interceptorReq = http.interceptors.request.use(
            reqInterceptor,
            (error) => {
                console.log('interceptor req error', error);
            }
        );

        // 攔截器回應
        const interceptorRes = http.interceptors.response.use(
            resInterceptor,
            errInterceptor
        );

        // 移除產生的instance
        return () => {
            http.interceptors.request.eject(interceptorReq);
            http.interceptors.response.eject(interceptorRes);
        }
    }, [userInfo]);

    return (
        <>{props.children}</>
    );
};

export default http;
export { AxiosInterceptor };
