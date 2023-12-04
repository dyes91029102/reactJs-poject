import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { useMount } from "react-use";
import { backgroundResponseModal } from "../models/baseModel";
import useUserInfoStore from "../state/useUserInfoStore";

export default function useSignalR() {
    const [hubConnection, setHubConnection] =
        useState<signalR.HubConnection | null>(null);

    // 取得儲存的帳號id
    const accountId = useUserInfoStore(state => state.userInfo?.id);

    // 組件裝載時 類似class componentDidMount
    useMount(() => {
        if (!hubConnection) {
            initInstance();
        }

    });

    const initInstance = () => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${process.env.REACT_APP_API_URL}/SocketBaseHub`, {
                /* account Id is singalr token */
                accessTokenFactory: () => accountId ? accountId : ''
            })
            .withAutomaticReconnect()
            .build();

        setHubConnection(newConnection);
    }

    // 接收訊息
    const receiveConnection = useCallback((methodName: string): Promise<backgroundResponseModal> => {
        return new Promise<backgroundResponseModal>((reslove, reject) => {
            hubConnection?.on(methodName, (message: backgroundResponseModal) => {
                reslove(message);
            });
        });
    }, [hubConnection]);

    useEffect(() => {
        if (hubConnection) {
            hubConnection
                .start()
                .then(() => {
                    console.log('SignalR 連線!');
                })
                .catch((err) => {
                    console.log('SignalR Connection Error: ', err);
                });
        }
        // 取消註冊
        return () => {
            if (hubConnection) {
                hubConnection
                    .stop()
                    .then(() => {
                        console.log('SignalR 關閉連線!');
                    })
                    .catch((err) => {
                        console.log('SignalR Disconnection Error: ', err);
                    });
            }
        }
    }, [hubConnection]);

    return { hubConnection, receiveConnection };
}