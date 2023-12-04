import http from "../context/AxiosProvider";
import { BaseResponse } from "../models/baseModel";

export class HttpClient {

    async get<T>(url: string): Promise<BaseResponse<T | any>> {
        return await http.get(url);
    }

    async post<T>(url: string, param?: any): Promise<BaseResponse<T | any>> {
        return await http
            .post(url, param);
    }

    async patch<T>(url: string, param: any): Promise<BaseResponse<T | any>> {
        return await http
            .patch(url, param);
    }

    async put<T>(url: string, param: any): Promise<BaseResponse<T | any>> {
        return await http
            .put(url, param);
    }

    async delete<T>(url: string): Promise<BaseResponse<T | any>> {
        return await http
            .delete(url);
    }
}