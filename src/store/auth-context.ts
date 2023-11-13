import axios from "axios";
import { createContext, useEffect, useState } from "react";

// 創建一個全域變數的物件 創建屬性或方法
let AuthContext = createContext({});
export default AuthContext;
