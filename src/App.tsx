import React, { FC, useContext, useMemo, useState } from 'react';
import './scss/all.scss';
import { BrowserRouter, Routes, Route, RouteObject, createBrowserRouter, RouterProvider, Navigate, useNavigate } from 'react-router-dom';

import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import NotFound from './components/Common/NotFound/NotFound';
import { Provider } from 'react-redux';
import Home from './pages/Home/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


/** router 範例 */
const App: FC<any> = () => {
  // const LazyThreeComponent = React.lazy(() => import('./components/TestComponent/TestThree'));


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
      element: <Home />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<Login />} />
    //     <Route path='/main' element={<Main />}>
    //     </Route>
    //     <Route path='*' element={<NotFound />} />
    //   </Routes>
    // </BrowserRouter>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/login'/>
    //     <Route path='/' element={<TestIndex />}>
    //       <Route path='/one' element={<TestOne/>} />
    //       <Route path='/two/:id' element={<TestTwo />} />
    //       <Route path='/three/:id' element={
    //         <React.Suspense fallback={<div>Loading</div>}>
    //           <LazyThreeComponent />
    //         </React.Suspense>} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
    <RouterProvider router={routers} />
  );
}
export default App;
