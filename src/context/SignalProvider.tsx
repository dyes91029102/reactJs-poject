import { createContext } from "react";

type SignalContextType = {
    hubConnection: signalR.HubConnection
}
// 創建一個全域變數的物件 創建屬性或方法
const SignalContext = createContext<SignalContextType | null>(null);
export { SignalContext };

interface SignalContextPropModel {
    children?: React.ReactNode;
    hubConnection: signalR.HubConnection;
}

export const SignalContextProvider = (props: SignalContextPropModel) => {

    const { hubConnection } = props;
    const contextData: SignalContextType = {
        hubConnection: hubConnection
    };
    return (
        <SignalContext.Provider value={contextData}>
            {props.children}
        </SignalContext.Provider>
    )
};