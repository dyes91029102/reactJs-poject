import { createContext, useContext } from "react";
import useSignalR from "../hooks/useSignalR";
import { backgroundResponseModal } from "../models/baseModel";

type SignalContextType = {
    hubConnection: signalR.HubConnection | null;
    receiveConnection: (methodName: string) => Promise<backgroundResponseModal>;
}
// 創建一個全域變數的物件 創建屬性或方法
const SignalContext = createContext<SignalContextType | null>(null);
interface SignalContextPropModel {
    children?: React.ReactNode;
}
/** 父層包住底下要使用的 */
const SignalContextProvider = (props: SignalContextPropModel) => {

    const signal = useSignalR();
    return (
        <SignalContext.Provider value={signal}>
            {props.children}
        </SignalContext.Provider>
    )
};


/** 給子層用的Context */
const useSingalRContext = () => useContext(SignalContext);

export default SignalContextProvider;
export { useSingalRContext, SignalContext };
