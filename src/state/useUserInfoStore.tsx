import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { UserInfoModel } from "../models/loginModel";
export interface UserInfoState {
    userInfo: UserInfoModel | null;
    setUserInfo: (info: UserInfoModel | null) => void;
}

/** 儲存userInfo資訊 */
const setUserInfo = (newInfo: UserInfoModel | null) => {
    console.log(newInfo);
    if(!newInfo){
        return null;
    }
    return { ...newInfo }
}

/** store資訊 
 * typescipt 用devtools 要多一個()
*/
const useUserInfoStore = create<UserInfoState>()(
    persist(
        devtools((set) => (
            {
                userInfo: null,
                setUserInfo: (newInfo) => set((state) => {
                    // immutably 方式給值，不改變state ，改變位址
                    return {
                        ...state,
                        userInfo: setUserInfo(newInfo)
                    }
                })
            }
        )),
        {
            name: 'userInfo',
            storage: createJSONStorage(() => localStorage),
            // 指定儲存部分欄位
            // partialize: (state) => ({ userInfo: state.userInfo })
        }
    )
);

export default useUserInfoStore;