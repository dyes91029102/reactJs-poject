import { GreenhouseListModel } from "../../models/greenhouseModel";
import { POST } from "../httpClient"

const getGreenhouseList = (searchParam: any) => {
    return POST<GreenhouseListModel>('v2/greenhouse/list', searchParam)
}

const getBoundarylist = (ghgId: string) => {
    return POST(`greenhouse/${ghgId}/boundarysetting/list`)
}

/** 溫盤api 方法 */
const GreenhouseService = {
    getGreenhouseList,
    getBoundarylist
}

export default GreenhouseService;