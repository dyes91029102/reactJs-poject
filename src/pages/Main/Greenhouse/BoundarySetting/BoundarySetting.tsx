import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GreenhouseService from "../../../../services/greenhouse/greenhouseService";
import GreenhouseQuery from "../../../../services/greenhouse/queries";
import ReactEcharts from "echarts-for-react";
interface BoundarySettingProps { }

const BoundarySetting: FC<BoundarySettingProps> = () => {
    const params = useParams();
    const navigate = useNavigate();
    console.log(params);
    const searchParam = {
        "searchKey": null,
        "sortKey": null,
        "sortType": null
    };

    /**  開發模式下，官方希望遵照準則，在初次渲染後，
    避免返回其他頁面，又立馬進入同一頁，導致實體被產生兩次。
    第一次進入會先將實體建立->摧毀->建立，好讓下次進入時，以確保上一個實體已結束
    cleanup 函式
    */

    // const {data} = GreenhouseQuery.useGetBoundaryList(params.ghgId || '');
    // console.log(data);
    useEffect(() => {
        GreenhouseService.getBoundarylist(params.ghgId || '')
            .then(x => {
                if (x) {
                    // console.log(x);
                }
            })

        console.log('取得api')
        return () => {
            console.log('摧毀');
        }
    }, []);

    /** 返回頁面 */
    const handleBack = () => {
        navigate('/main/greenhouse/list');
    }

    /** echart 設置 */
    const BarChart = () => {
        let option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar'
                }
            ]
        };

        return <ReactEcharts option={option} />;
    }
    return (<>
        <button onClick={handleBack}>
            back
        </button>
        <div>
            ghgId: {params.ghgId}
        </div>
        <div>
            <span>echart 範例</span>
            <BarChart/>
        </div>
    </>)
}

export default BoundarySetting;