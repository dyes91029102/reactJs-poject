import { useQuery } from "@tanstack/react-query";
import GreenhouseService from "./greenhouseService";
import { GreenhouseListModel } from "../../models/greenhouseModel";

/** 定義的keys */
const GreenhouseKeys = {
    list: 'list',
    boundaryList: 'boundaryList'
};

export { GreenhouseKeys };

/** 常用的query 可以放這邊 */
const useGetList = (searchParam: any) => {
    return useQuery({
        queryKey: [GreenhouseKeys.list, searchParam],
        queryFn: () => GreenhouseService.getGreenhouseList(searchParam),
        refetchOnWindowFocus: false
    });
}

const useGetBoundaryList = (ghgId: string) => {
    return useQuery({
        queryKey: [GreenhouseKeys.boundaryList, ghgId],
        queryFn: () => GreenhouseService.getBoundarylist(ghgId),
        refetchOnWindowFocus: false,
        retry: 0
    });
}

const GreenhouseQuery = {
    useGetList,
    useGetBoundaryList
};
export default GreenhouseQuery;