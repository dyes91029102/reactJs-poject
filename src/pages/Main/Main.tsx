import React, { FC, useContext } from 'react';
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider, RouteObject, useRoutes, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Home from '../Home/Home';
import NotFound from '../../components/NotFound/NotFound';
import Layout from '../Layout/Layout';
import Greenhouse from './Greenhouse/Greenhouse';
import Carbon from './Carbon/Carbon';

interface MainProps { }

const Main: FC<MainProps> = () => {

  // 創建router
  const routers: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          path: '/greenhouse',
          element: <Greenhouse />,
          errorElement: <NotFound />
        }, {
          path: '/carbon',
          element: <Carbon />,
          errorElement: <NotFound />
        }
      ]
    },
    {
      index: true,
      path: '/home',
      element: <Home />
    }
  ];
  let elements = useRoutes(routers);
  return (

    <div>
      {/* {elements} */}
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index path='/greenhouse' element={<Greenhouse />}/>
          <Route path='/carbon'element={<Carbon />}/>
        </Route>

      </Routes>
    </div>
  );
}

export default Main;
