import { useState, useEffect, createContext } from "react";
import TokenService from "../services/token.service";
import { Navigate } from "react-router-dom";
/** 定義類型(靜態資料不可extends) */
export type AuthContextType = {
    user: any;
    setUser: (userInfo: any) => void;
};

// 創建一個全域變數的物件 創建屬性或方法
const AuthContext = createContext<AuthContextType | null>(null);
export { AuthContext };

// contextData儲存身份驗證的狀態和更新它的方法
export const AuthProvider = ({ children }: any) => {

    const token = TokenService.getAuthToken();

    // 沒有token 不可進入
    // if(token){

    // }else{
    //     alert('尚未登入');
    //     return <Navigate to="/login"/>
    // }

    const setUser = (userInfo: any) => {
        if(userInfo){

            let arr: string[] = userInfo.permission.pages;
            // 測試用
            userInfo.permission.pages = arr.filter(p => p !== 'carbon');
        }
        contextData.user = userInfo;
        console.log(contextData);
    }
    let contextData: AuthContextType = {
        user: null,
        setUser: setUser
    }



    // 透過contextData來改變狀態
    return (
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;