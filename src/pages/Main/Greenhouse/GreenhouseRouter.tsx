import { FC } from 'react';
import { Navigate,Outlet,RouteObject,useRoutes } from 'react-router-dom';
import NotFound from '../../../components/Common/NotFound/NotFound';
import BoundarySetting from './BoundarySetting/BoundarySetting';
import GreenhouseList from './GreenhouseList';
import GreenhouseLayout from './GreenhouseLayout';
import GreenhouseTab2Test from './GreenhouseTab2Test/GreenhouseTab2Test';


interface GreenhouseProps { }

export interface TestDataModel {
  id: string;
  name: string;
}

const Greenhouse: FC<GreenhouseProps> = () => {
  // 創建router
  const routers: RouteObject[] = [
    {
      path: '/',
      element: <Outlet />,
      children: [
        {
          path: '/',
          element: <Navigate to={'list'} />
        },
        {
          path: 'list',
          element: <GreenhouseList />,
          errorElement: <NotFound />
        },
        {
          path: ':ghgId',
          element: <GreenhouseLayout/>,
          children: [
            {
              path: 'boundarysetting/list',
              element: <BoundarySetting />
            },
            {
              path: 'two',
              element: <GreenhouseTab2Test />
            }
          ]
        }
       
      ]
    }, {
      path: 'list',
      element: <GreenhouseList />,
      errorElement: <NotFound />
    }
  ];
  // 相當於router
  let elements = useRoutes(routers);
  return (
    <>
      {elements}      
    </>
  );
}

export default Greenhouse;
