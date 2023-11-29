import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { useMount } from "react-use";
import { AuthContext, AuthContextType } from "../context/AuthProvider";
import { backgroundResponseModal } from "../models/baseModel";

export default function useSignalR() {
    const [hubConnection, setHubConnection] =
        useState<signalR.HubConnection | null>(null);


    const { userEsgAccountId } = useContext(AuthContext) as AuthContextType;

    // const newConnection:signalR.HubConnection = useMemo(() => {
    //     return new signalR.HubConnectionBuilder()
    //         .withUrl(`${process.env.REACT_APP_API_URL}/SocketBaseHub`, {
    //             /* account Id is singalr token */
    //             accessTokenFactory: () => userEsgAccountId
    //         })
    //         .withAutomaticReconnect()
    //         .build();
    // }, [userEsgAccountId]);

    const initInstance = () => {
        // const newConnection = new signalR.HubConnectionBuilder()
        //     .withUrl(`${process.env.REACT_APP_API_URL}/SocketBaseHub`, {
        //         /* account Id is singalr token */
        //        // accessTokenFactory: () => userEsgAccountId
        //     })
        //     .withAutomaticReconnect()
        //     .build();
            const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${process.env.REACT_APP_API_URL}/SocketBaseHub`)
            .withAutomaticReconnect()
            .build();

        setHubConnection(newConnection);
    }

    // 組件裝載時 類似class componentDidMount
    useMount(() => {
        if (!hubConnection) {
            console.log('initHub')
            initInstance();
        }

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