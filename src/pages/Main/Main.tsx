import React, { FC, useContext } from 'react';
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider, RouteObject, useRoutes, useNavigate, Navigate } from 'react-router-dom';
import Home from '../Home/Home';
import NotFound from '../../components/NotFound/NotFound';
import Layout from '../Layout/Layout';
import Greenhouse from './Greenhouse/Greenhouse';
import Carbon from './Carbon/Carbon';
import Energy from './Energy/Energy';

interface MainProps { }

const Main: FC<MainProps> = () => {

  // 創建router
  const routers: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/greenhouse/*',
          element: <Greenhouse />,
          errorElement: <NotFound />
        }, {
          path: '/carbon',
          element: <Carbon />,
          errorElement: <NotFound />
        }, {
          path: '/energy',
          element: <Energy />,
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
