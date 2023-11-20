import { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";

interface GreenhouseLayoutProps { }

const GreenhouseLayout: FC<GreenhouseLayoutProps> = () => {

    return (
        <>
            {/* tab 資訊 */}
            <div style={{
                backgroundColor: "#fff",
                paddingLeft: "55px",
                borderBottom: "4px solid #ECF4F7"
            }}>
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to={'boundarysetting/list'}>
                            組織邊界
                        </NavLink>

                    </li>
                    <li className="nav-item">
                        <NavLink  className="nav-link" to={'two'}>
                            測試溫盤2
                        </NavLink>

                    </li>
                </ul>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </>
    )
}

export default GreenhouseLayout;