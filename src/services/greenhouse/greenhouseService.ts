import { GreenhouseListModel } from "../../models/greenhouseModel";
import { HttpClient } from "../httpClient";

const httpClient = new HttpClient();

const getGreenhouseList = (searchParam: any) => {
    return httpClient.post<GreenhouseListModel>('v2/greenhouse/list', searchParam)
}

const getBoundarylist = (ghgId: string) => {
    return httpClient.post(`greenhouse/${ghgId}/boundarysetting/list`)
}

/** 溫盤api 方法 */
const GreenhouseService = {
    getGreenhouseList,
    getBoundarylist
}

export default GreenhouseService;