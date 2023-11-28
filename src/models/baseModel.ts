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

/** 背景執行model */
export interface backgroundResponseModal {
    /* 模組名稱 */
    type: string;
    /* 專案名稱 */
    projectName: string;
    /* 專案Id */
    projectId: string;
    /* 執行名稱 */
    action: string;
    /* 執行狀態（目前有: success, fail, Processing） */
    status: string;
    /* 回傳Url */
    returnUrl: string;
    /* 顯示訊息 */
    message: string;
    /* signalr job id */
    jobId: string;
    /* 判斷是否為長時程 boolean */
    isLongTermJob: boolean;
}