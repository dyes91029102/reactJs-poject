import React, { useEffect, useState } from "react"
import axios from "axios"
import { TestDataModel } from "../pages/Main/Greenhouse/Greenhouse";
const currentHost = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
export const useGetQuery = (baseUrl: string) => {
    const [data, setData] = useState<TestDataModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    console.log(currentHost)
    // 當url改動時，才打api
    useEffect(() => {
        const loadData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                // 呼叫axios套件打api 不是status 200會跳入catch error
                const { data } = await axios.get<any>(`${currentHost}/${baseUrl}`).then(p=> p.data);
                setData(data);
            } catch (ex) {
                setIsError(true);
            }

            setIsLoading(false);
        };
        loadData();
    }, [baseUrl]);


    return { data, isLoading, isError };
} 
