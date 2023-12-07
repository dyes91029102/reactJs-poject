import React, { FC, Suspense, lazy, useContext, useEffect, useMemo } from 'react';
import { RouteObject, useRoutes, useNavigate, Navigate, Routes, Router, Route } from 'react-router-dom';
import Layout from './Layout';
import Carbon from './Carbon/Carbon';
// import Greenhouse from './Greenhouse/Greenhouse';
import Energy from './Energy/Energy';
import Home from '../Home/Home';
import useUserInfoStore from '../../state/useUserInfoStore';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import NotFound from '../../components/common/NotFound/NotFound';
import VisuallLoading from '../../components/common/VisuallLoading/VisuallLoading';

interface MainProps { }


const Main: FC<MainProps> = () => {

  const { userInfo, setUserInfo } = useUserInfoStore();
  console.log('main');

  // 延遲載入 (目前跟翻譯會互相打架 重新渲染)
  const Greenhouse = lazy(() => import('./Greenhouse/Greenhouse'));
  // const Carbon = lazy(() => import('./Carbon/Carbon'));
  // const Energy = lazy(() => import('./Energy/Energy'));
  // 創建router
  const routers: RouteObject[] = [
    {
      path: '/',
      element:
        <ProtectedRoute redirectPath='/home'>
          <Layout />
        </ProtectedRoute>,
      children: [
        {
          path: '/',
          element: <Navigate to={'greenhouse'} />
        },
        {
          path: 'greenhouse/*',
          element:
            <Suspense fallback={<VisuallLoading />}>
              <Greenhouse />
            </Suspense>,
          errorElement: <NotFound />
        }, {
          path: 'carbon',
          element:
            <ProtectedRoute isAllowed={userInfo && userInfo.permission.pages.includes('carbon2')}>
              <Carbon />,
            </ProtectedRoute>,
          errorElement: <NotFound />
        }, {
          path: 'energy',
          element: <Energy />,
          errorElement: <NotFound />
        }
      ]
    },
    {
      path: '/home',
      element: <Home />
    }
  ];
  let elements = useRoutes(routers);

  //   <Routes>
  //     <Route path="/" element={
  //       <ProtectedRoute redirectPath='/home'>
  //         <Layout />
  //       </ProtectedRoute>
  //     }>
  //       <Route path="/greenhouse/*" element={<Greenhouse />}></Route>
  //     </Route>
  //     <Route path="/home" element={<Home />}></Route>
  //   </Routes>
  return (
    <>
      {!userInfo ?
        <Navigate to={'/login'} /> :
        elements}
    </>
  );
}

export default Main;
