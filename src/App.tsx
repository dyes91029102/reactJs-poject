import React, { FC, Suspense, lazy, useContext, useMemo, useState } from 'react';
import './scss/all.scss';
import { BrowserRouter, Routes, Route, RouteObject, createBrowserRouter, RouterProvider, Navigate, useNavigate, Outlet } from 'react-router-dom';

import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import NotFound from './components/Common/NotFound/NotFound';

/** router 範例 */
const App: FC<any> = () => {
  console.log('app render')
  const routers = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to='/login' />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/main/*',
      element: <Main />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])
  return (
    <RouterProvider router={routers} />
  );
}
export default App;
