import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../utils/api";

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
    useEffect(() => {
        api.post(`greenhouse/${params.ghgId}/boundarysetting/list`,
            searchParam)
            .then(x => {
                if (x) {
                    // console.log(x);
                }
            })

            console.log('取得api')
        return ()=>{
            console.log('摧毀');
        }
    }, [])

    const handleBack = ()=>{
        navigate('/main/greenhouse/list');
    }
    return (<>
        <button onClick={handleBack}>
            back
        </button>
        <div>
            ghgId: {params.ghgId}
        </div>
    </>)
}

export default BoundarySetting;