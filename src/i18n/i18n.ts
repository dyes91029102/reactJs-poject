import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from "i18next-http-backend";
import resources from './resource';
import { LocaleType } from '../models/localeModel';
import StorageName from '../constants/storageName';
// localstorage 語言
let localLang = localStorage.getItem(StorageName.LANGUAGE);
// 瀏覽器預帶lang
const browserLang = navigator.language;

if (!localLang) {
  // 其他都預設英文
  switch (browserLang) {
    case LocaleType.En:
    case LocaleType.ZhCn:
    case LocaleType.ZhTw:
      localLang = browserLang;
      break;
    default:
      localLang = LocaleType.En;
      break;
  }
}

/** 
 * i18next-http-backend 則是能夠讓語言檔透過 
 * XMLHttpRequest 或 the fetch API 來載入
 */

i18n
  .use(Backend)    // 使用 i18next-http-backend
  .use(initReactI18next) // 將 i18next 傳入 react-i18next 裡面
  .init({
    // debug: true,
    // 初始語言
    lng: localLang,
    // 當目前的語言檔找不到對應的字詞時，會用 fallbackLng (zh-TW) 作為預設語言
    fallbackLng: localLang,
    backend: {
      //網頁載入時去下載語言檔的位置 (從外部直接更動)
      // 默認 public/locales/{lng}/translation.json
      loadPath: `/locales/{{lng}}/{{ns}}.json`
    },
    // resources, // 引入字典 語系檔內部直接使用的話 (backend 取其一使用)
    interpolation: {
      // 是否要讓字詞 escaped 來防止 xss 攻擊，這裡因為 React.js 已經做了，就設成 false即可
      escapeValue: false
    }
  });

export default i18n;
