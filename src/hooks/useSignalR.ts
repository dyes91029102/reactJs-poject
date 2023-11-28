import { useCallback, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { useMount } from "react-use";
import { AuthContext, AuthContextType } from "../context/AuthProvider";
import { backgroundResponseModal } from "../models/baseModel";

export default function useSignalR(hubUrl: string) {
    const [hubConnection, setHubConnection] =
        useState<signalR.HubConnection | null>(null);


    const { userEsgAccountId } = useContext(AuthContext) as AuthContextType;
    // 組件裝載時 類似class componentDidMount
    useMount(() => {
   
        console.log('mount accountId',userEsgAccountId)
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl, {
                /* account Id is singalr token */
                accessTokenFactory: () => userEsgAccountId
            })
            .withAutomaticReconnect()
            .build();

        setHubConnection(newConnection);

    });

    const receiveConnection = useCallback((methodName: string): Promise<backgroundResponseModal> => {
        return new Promise<backgroundResponseModal>((reslove, reject) => {
            // (methodName: string) => {
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