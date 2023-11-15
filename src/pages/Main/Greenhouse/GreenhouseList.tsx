import { FC, useEffect } from "react";
import api from "../../../utils/api";
import TokenService from "../../../services/token.service";
import { useLocation, useNavigate } from "react-router-dom";

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

    useEffect(() => {
        api.post('v2/greenhouse/list', searchParam)
            .then(x => {
                if (x) {
                    console.log(x);
                }
            })

        return ()=>{};
    }, []);


    const cancelRefreshToken = () => {
        let token = TokenService.getAuthToken();
        if (token) {
            console.log(token)
            // 若token存在，則判斷token到期時間
            let exp = Number(JSON.parse(atob(token.split('.')[1])).exp + '000');

            console.log('exp', exp)
            console.log('now', Date.now());

        }

        navigate('/main/greenhouse/boundarysetting/6ae04009-4f09-4295-aaba-d1885ae87904/list')
        // api.post('greenhouse/6ae04009-4f09-4295-aaba-d1885ae87904/boundarysetting/list',
        // searchParam)
        //   .then(x => {
        //     if (x) {
        //       console.log(x);
        //     }
        //   })
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

                <div className='loginBox'>
                    <button onClick={cancelRefreshToken}> Other Person api</button>
                </div>
                {locationObj.pathname}
                {'溫盤頁面'}
            </div>
        </div>
    )
}

export default GreenhouseList;