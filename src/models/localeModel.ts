import { OptionModel } from "./baseModel"

/** 語言類型 */
export const LocaleType = {
    /** 英語 */
    En: 'en',
    /** 中文繁體 */
    ZhTw: 'zh-TW',
    /** 中文簡體 */
    ZhCn: 'zh-CN'
}

/** 語言陣列 */
export const LocaleArr:OptionModel[] = [
    {
        id: 'en',
        text: '英文'
    },{
        id: 'zh-TW',
        text: '中文繁體'
    },{
        id: 'zh-CN',
        text: '中文簡體'
    }
];