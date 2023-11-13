import React, { FC, useContext, useMemo, useState } from 'react';
import './scss/all.scss';
import { BrowserRouter, Routes, Route, RouteObject, createBrowserRouter, RouterProvider, Navigate, useNavigate } from 'react-router-dom';

import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import NotFound from './components/NotFound/NotFound';
import { Provider } from 'react-redux';
import AuthContext from './store/auth-context';


/** router 範例 */
const App: FC<any> = () => {
  // const LazyThreeComponent = React.lazy(() => import('./components/TestComponent/TestThree'));

  let { isAuthenticated }: any = useContext(AuthContext);
  console.log('isAuthenticated', isAuthenticated);

  const routers = createBrowserRouter([
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/',
      element:
        isAuthenticated ? <Main /> : <Navigate to='/login' />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={
          isAuthenticated ? <Main /> : <Navigate to='/login' />}>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
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
    // <RouterProvider router={routers} />
  );
}
export default App;
