import { BaseResponse } from "../models/baseResponse";
import axiosClient from "../services/axiosClient";

export class HttpClient {

    private _httpClient = axiosClient;
  
    async get<T>(url: string): Promise<BaseResponse<T | any>> {
        return await this._httpClient.get(url).then((response) => response.data);
    }

    async post<T>(url: string, param?: any): Promise<BaseResponse<T | any>> {
        return await this._httpClient
            .post(url, param)
            .then((res) => res.data);
    }

    async patch<T>(url: string, param: any): Promise<BaseResponse<T | any>> {
        return await this._httpClient
            .patch(url, param)
            .then((res) => res.data);
    }

    async put<T>(url: string, param: any): Promise<BaseResponse<T | any>> {
        return await this._httpClient
            .put(url, param)
            .then((res) => res.data);
    }

    async delete<T>(url: string): Promise<BaseResponse<T | any>> {
        return await this._httpClient
            .delete(url)
            .then((res) => res.data);
    }
}