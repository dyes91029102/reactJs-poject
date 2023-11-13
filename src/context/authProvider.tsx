import { useState, useEffect, createContext } from "react";
/** 定義類型(靜態資料不可extends) */
export type TodoContextType = {
    user: any;
    setUser: (userInfo: any) => void;
};

// 創建一個全域變數的物件 創建屬性或方法
const AuthContext = createContext<TodoContextType | null>(null);
export { AuthContext };

// contextData儲存身份驗證的狀態和更新它的方法
export const AuthProvider = ({ children }: any) => {

    // token 狀態
    let [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
    // 完成請求後false
    let [isLoading, setIsLoading] = useState(true)

    const backendIp = 'http://test'
    let setIsAuthenticated = (val: boolean) => {
        setIsAuthenticatedState(val)
    }


    // 認證token 的方法
    let verifyToken = () => {
        setIsAuthenticatedState(false);
        setIsLoading(false);
        // refresh token #######################
        // 透過cookie 傳送令牌
        // withCredentials true 允許使用cookie傳送
        // axios({
        //     method: 'post',
        //     url: backendIp + '/api/token/refresh',
        //     withCredentials: true,
        //     data: {
        //         'username': localStorage.getItem('currentUser')
        //     }
        // })
        //     .then((res) => {
        //         if (res.status === 200) {
        //             // verify token #####################    
        //             // 驗證token 是不是正常
        //             axios({
        //                 method: 'post',
        //                 url: backendIp + '/api/token/verify',
        //                 withCredentials: true,
        //                 data: {
        //                     'username': localStorage.getItem('currentUser')
        //                 },
        //             })
        //                 .then(res => {
        //                     setIsLoading(false)

        //                     // if token valid ########
        //                     if (res.status === 200) {
        //                         setIsAuthenticatedState(true)
        //                     }else{
        //                         alert('refresh token失效')
        //                     }
        //                 })
        //         }
        //         else {
        //             setIsLoading(false)
        //         }
        //     })
        //     .catch(err => {
        //         setIsLoading(false)
        //     })
    }

    // let contextData = {
    //     isAuthenticated: isAuthenticatedState,
    //     setIsAuthenticated: setIsAuthenticated
    // }

    // // 給予空陣列，在初始化時觸發就好，不要應元件更新而觸發
    // useEffect(() => {
    //     verifyToken();
    //     console.log(contextData)
    // }, []);

    // 定義user
    const [user, setUser] = useState<any>();
    let contextData: TodoContextType = {
        user: user,
        setUser: (userInfo: any) => {
            setUser({...userInfo});
        }
    }

    console.log(contextData);

    // 透過contextData來改變狀態
    return (
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;