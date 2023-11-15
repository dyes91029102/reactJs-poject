import { FC } from "react"
import { Outlet, RouteObject, useRoutes } from "react-router-dom";



const GreenhouseIndex: FC<any> = () => {


    return (<>
        <div>
            盤查設定
        </div>
        <div>

            <Outlet></Outlet>
        </div>
    </>)
}

export default GreenhouseIndex;