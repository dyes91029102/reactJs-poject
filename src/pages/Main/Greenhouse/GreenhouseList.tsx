import { FC, useEffect } from "react";
import TokenService from "../../../services/auth/tokenService";
import { useLocation, useNavigate } from "react-router-dom";
import { use } from "i18next";
import { useQuery } from "@tanstack/react-query";
import GreenhouseService from "../../../services/greenhouse/greenhouseService";
import GreenhouseQuery, { GreenhouseKeys } from "../../../services/greenhouse/queries";
import { GreenhouseListModel } from "../../../models/greenhouseModel";
import VisuallLoading from "../../../components/common/VisuallLoading/VisuallLoading";

const GreenhouseList: FC<any> = () => {
    

    const navigate = useNavigate();
    const searchParam = {
        "searchKey": null,
        "sortKey": null,
        "sortType": null,
        "choiceCompanies": [
            "962d2087-2206-4b76-9841-a7c006f37b59"
        ],
        "choiceYears": []
    };


    const { isError, isLoading, data: listData } =
        GreenhouseQuery.useGetList(searchParam);


    // const { isError:isError2, isLoading:isLoading2, data: listData2 } = useQuery({
    //     queryKey: [GreenhouseKeys.list],
    //     queryFn: ()=> GreenhouseService.getGreenhouseList(searchParam),
    //     refetchOnWindowFocus: false
    // });
    console.log(listData);

    const handOtherPath = (ghgId: string) => {


        navigate(`/main/greenhouse/${ghgId}/boundarysetting/list`);

    }

    const locationObj = useLocation();

    return (
        <div>
            <div className="nav-container">
                <h1 className="d-flex align-items-center">
                    <img className="nav-img"
                        alt="" src="/assets/images/module-icon/greenhouse.svg" />
                    <div className="nav-title">組織溫盤列表</div>
                </h1>
            </div>
            <div style={{
                padding: '10px 55px'
            }}>
                {isLoading ? <VisuallLoading /> : ''}
                <table>
                    <thead>
                        <tr>
                            <th>報告書名稱</th>
                            <th>據點名稱</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listData?.data.map((p: GreenhouseListModel) => {
                                return (
                                    <tr key={p.ghgId} 
                                    onClick={() => handOtherPath(p.ghgId)}>
                                        <td>{p.projectName}</td>
                                        <td>{p.location}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default GreenhouseList;