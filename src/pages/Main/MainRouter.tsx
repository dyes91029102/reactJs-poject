import React, { FC, Suspense, lazy, useContext } from 'react';
import { RouteObject, useRoutes, useNavigate, Navigate } from 'react-router-dom';
import NotFound from '../../components/Common/NotFound/NotFound';
import Layout from './Layout';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import { AuthContext, AuthContextType } from '../../context/AuthProvider';
import VisuallLoading from '../../components/Common/VisuallLoading/VisuallLoading';
// import Greenhouse from './Greenhouse/Greenhouse';

interface MainProps { }

const Main: FC<MainProps> = () => {
  const { user } = useContext(AuthContext) as AuthContextType;
  console.log(`main`)

  // 延遲載入
  const Greenhouse = lazy(() => import('./Greenhouse/GreenhouseRouter'));
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
    </>
  );
}

export default Main;
