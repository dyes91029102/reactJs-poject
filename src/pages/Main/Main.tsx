import React, { FC, Suspense, lazy, useContext } from 'react';
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider, RouteObject, useRoutes, useNavigate, Navigate } from 'react-router-dom';
import Home from '../Home/Home';
import NotFound from '../../components/Common/NotFound/NotFound';
import Layout from '../Layout/Layout';
import Carbon from './Carbon/Carbon';
import Energy from './Energy/Energy';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import { AuthContext, AuthContextType } from '../../context/AuthProvider';
import VisuallLoading from '../../components/Common/VisuallLoading/VisuallLoading';

interface MainProps { }

const Main: FC<MainProps> = () => {
  const { user } = useContext(AuthContext) as AuthContextType;

  const Greenhouse = lazy(() => import('./Greenhouse/Greenhouse'));
  const Carbon = lazy(() => import('./Carbon/Carbon'));
  const Energy = lazy(() => import('./Energy/Energy'));
  // 創建router
  const routers: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
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
            <Suspense fallback={<VisuallLoading />}>
              <ProtectedRoute isAllowed={user && user.permission.pages.includes('carbon')}>
                <Carbon />
              </ProtectedRoute>
            </Suspense>,
          errorElement: <NotFound />
        }, {
          path: 'energy',
          element:
            <Suspense fallback={<VisuallLoading />}>
              <Energy />
            </Suspense>,
          errorElement: <NotFound />
        }
      ]
    }
  ];
  let elements = useRoutes(routers);
  return (

    <>
      {elements}
      {/* <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Navigate to='/home'/>}/>
          <Route path='/home' element={<Home/>} />
          <Route path='/greenhouse' element={<Greenhouse />}/>
          <Route path='/carbon'element={<Carbon />}/>
        </Route>

      </Routes> */}
    </>
  );
}

export default Main;
