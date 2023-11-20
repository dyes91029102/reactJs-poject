import { FC } from "react"
import { Outlet, RouteObject, useRoutes } from "react-router-dom";



const GreenhouseIndex: FC<any> = () => {


    return (<>
        <Outlet/>
    </>)
}

export default GreenhouseIndex;