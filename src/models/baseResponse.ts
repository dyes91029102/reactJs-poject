export interface BaseResponse<T> {
    Code: number;
    Success: boolean;
    Message: string;
    Data: T;
}

