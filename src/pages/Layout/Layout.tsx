import React, { FC } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import TestIndex from '../../components/router-component/test-card/TestIndex';
import TestOne from '../../components/router-component/test-card/TestOne';
import TestThree from '../../components/router-component/test-card/TestThree';
import TestTwo from '../../components/router-component/test-card/TestTwo';


interface LayoutProps { }

const Layout: FC<LayoutProps> = () => {

  // 創建router
  const routers = createBrowserRouter([
    {
      path: '/',
      element: <TestIndex />,
      children: [
        {
          path: 'one',
          element: <TestOne />
        }, {
          path: 'two',
          element: <TestTwo />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={routers} />
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<TestIndex />}>
    //       <Route index element={<TestOne />}></Route>
    //       <Route path='two' element={<TestTwo />}></Route>
    //       <Route path='three' element={<TestThree />}></Route>
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  )
};

export default Layout;
