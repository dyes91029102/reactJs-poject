export interface BaseResponse<T> {
    Code: number;
    Success: boolean;
    Message: string;
    Data: T;
}

/** 基礎option model */
export interface OptionModel {
    id: string;
    text: string;
}