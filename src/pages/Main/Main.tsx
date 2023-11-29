import React, { FC, Suspense, lazy, useContext, useMemo } from 'react';
import { RouteObject, useRoutes, useNavigate, Navigate } from 'react-router-dom';
import NotFound from '../../components/Common/NotFound/NotFound';
import Layout from './Layout';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import { AuthContext, AuthContextType } from '../../context/AuthProvider';
import Carbon from './Carbon/Carbon';
import Greenhouse from './Greenhouse/Greenhouse';
import Energy from './Energy/Energy';
import Home from '../Home/Home';
import { SignalContextProvider } from '../../context/SignalProvider';
import { SignalR } from '../../utils/signalR';
// import Greenhouse from './Greenhouse/Greenhouse';

interface MainProps { }


const Main: FC<MainProps> = () => {
  const { user } = useContext(AuthContext) as AuthContextType;

  const signal = new SignalR("");
  // 延遲載入 (目前跟翻譯會互相打架 重新渲染)
  // const Greenhouse = lazy(() => import('./Greenhouse/GreenhouseRouter'));
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
          element: <Greenhouse />,
          errorElement: <NotFound />
        }, {
          path: 'carbon',
          element:
            <ProtectedRoute isAllowed={user && user.permission.pages.includes('carbon')}>
              <Carbon />
            </ProtectedRoute>,
          errorElement: <NotFound />
        }, {
          path: 'energy',
          element: <Energy />,
          errorElement: <NotFound />
        }
        // {
        //   path: 'greenhouse/*',
        //   element: 
        //     <Suspense fallback={<VisuallLoading />}>
        //       <Greenhouse />
        //     </Suspense>,
        //   errorElement: <NotFound />
        // }, {
        //   path: 'carbon',
        //   element:
        //     <Suspense fallback={<VisuallLoading />}>
        //       <ProtectedRoute isAllowed={user && user.permission.pages.includes('carbon')}>
        //         <Carbon />
        //       </ProtectedRoute>
        //     </Suspense>,
        //   errorElement: <NotFound />
        // }, {
        //   path: 'energy',
        //   element:
        //     <Suspense fallback={<VisuallLoading />}>
        //       <Energy />
        //     </Suspense>,
        //   errorElement: <NotFound />
        // }
      ]
    },
    {
      path: '/home',
      element: <Home />
    }
  ];
  let elements = useRoutes(routers);
  return (
    <>
      <SignalContextProvider hubConnection={signal.hubConnection}>
        {elements}
      </SignalContextProvider>
    </>
  );
}

export default Main;
