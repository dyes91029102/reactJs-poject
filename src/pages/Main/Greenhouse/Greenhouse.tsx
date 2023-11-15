import React, { FC, useContext, useEffect } from 'react';
import { Navigate, RouteObject, useLocation, useParams, useRoutes, useSearchParams } from 'react-router-dom';
import TokenService from '../../../services/token.service';
import api from '../../../utils/api';
import GreenhouseIndex from './Index';
import NotFound from '../../../components/NotFound/NotFound';
import BoundarySetting from './BoundarySetting/BoundarySetting';
import GreenhouseList from './GreenhouseList';


interface GreenhouseProps { }

export interface TestDataModel {
  id: string;
  name: string;
}

const Greenhouse: FC<GreenhouseProps> = () => {
  const searchParam = {
    "searchKey": null,
    "sortKey": null,
    "sortType": null,
    "choiceCompanies": [
      "962d2087-2206-4b76-9841-a7c006f37b59"
    ],
    "choiceYears": []
  };


    // 創建router
    const routers: RouteObject[] = [
      {
        path: '/',
        element: <GreenhouseIndex />,
        children: [
          {
            path: '',
            element: <Navigate to='list'/>
          },
          {
            path: '/list',
            element: <GreenhouseList />,
            errorElement: <NotFound />
          }, {
            path: '/boundarysetting/:ghgId/list',
            element: <BoundarySetting />
          }
        ]
      }
    ];
    let elements = useRoutes(routers);
  return (
    <>
      {elements}
    </>
  );
}

export default Greenhouse;
