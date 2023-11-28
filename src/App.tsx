import React, { FC, Suspense, lazy, useContext, useMemo, useState } from 'react';
import './scss/all.scss';
import { BrowserRouter, Routes, Route, RouteObject, createBrowserRouter, RouterProvider, Navigate, useNavigate, Outlet } from 'react-router-dom';

import Login from './pages/Login/Login';
import Main from './pages/Main/MainRouter';
import NotFound from './components/Common/NotFound/NotFound';
import Home from './pages/Home/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


/** router 範例 */
const App: FC<any> = () => {
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
      element:
        <ProtectedRoute redirectPath='/home'>
          <Main />
        </ProtectedRoute>
    },
    {
      path: '/home',
      element: <Home/>
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
