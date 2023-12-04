import './scss/all.scss';
import { BrowserRouter, Routes, Route, RouteObject, createBrowserRouter, RouterProvider, Navigate, useNavigate, Outlet } from 'react-router-dom';

import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import NotFound from './components/common/NotFound/NotFound';
import { FC } from 'react';
import useUserInfoStore from './state/useUserInfoStore';
import SignalContextProvider from './context/SignalProvider';

/** router 範例 */
const App: FC<any> = () => {
  console.log('app');
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
        <SignalContextProvider>
          <Main />
        </SignalContextProvider>
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
