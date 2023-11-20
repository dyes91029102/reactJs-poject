export interface BaseResponse<T> {
    code: number;
    success: boolean;
    message: string;
    data: T;
}

/** 基礎option model */
export interface OptionModel {
    id: string;
    text: string;
}