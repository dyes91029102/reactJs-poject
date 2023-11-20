import { BaseResponse } from "../models/baseResponse";
import axiosClient from "../services/axiosClient";

async function GET<T>(url: string): Promise<BaseResponse<T | any>> {
    return await axiosClient.get(url).then((response) => response.data);
}

async function POST<T>(url: string, param?: any): Promise<BaseResponse<T | any>> {
    return await axiosClient
        .post(url, param)
        .then((res) => res.data);
}

async function PATCH<T>(url: string, param: any): Promise<BaseResponse<T | any>> {
    return await axiosClient
        .patch(url, param)
        .then((res) => res.data);
}

async function PUT<T>(url: string, param: any): Promise<BaseResponse<T | any>> {
    return await axiosClient
        .put(url, param)
        .then((res) => res.data);
}

async function DELETE<T>(url: string): Promise<BaseResponse<T | any>> {
    return await axiosClient
        .delete(url)
        .then((res) => res.data);
}

export { GET, POST, PUT, PATCH, DELETE };
