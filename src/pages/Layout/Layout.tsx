import React, { FC } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import TestIndex from '../../components/RouterSample/TestComponent/TestIndex';
import TestOne from '../../components/RouterSample/TestComponent/TestOne';
import TestTwo from '../../components/RouterSample/TestComponent/TestTwo';
import Home from '../../components/RouterSample/Home/Home';
import Header from '../../components/RouterSample/Header/Header';
import NotFound from '../../components/RouterSample/NotFound/NotFound';
import TestThree from '../../components/RouterSample/TestComponent/TestThree';



interface LayoutProps { }


/** 範例1 Router */
const LayoutSample1: FC<LayoutProps> = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='page1' element={<TestOne />} />
        <Route path='page2' element={<TestTwo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

/** 範例2  Nested Routes */
const LayoutSample2: FC<LayoutProps> = () => {

  // 創建router
  const routers = createBrowserRouter([
    {
      path: '/',
      element: <TestIndex />,
      children: [
        {
          path: 'one',
          element: <TestOne />,
          errorElement: <NotFound />
        }, {
          path: 'two/:id',
          element: <TestTwo />,
          errorElement: <NotFound />
        }, {
          path: 'three/:id',
          element: <TestThree />,
          errorElement: <NotFound />
        }
      ]
    }
  ]);

  return (
    <div>
      <RouterProvider router={routers} />
    </div>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<TestIndex />}>
    //       <Route index path='one' element={<TestOne />}/>
    //       <Route path='/two/:id' element={<TestTwo />}/>
    //       <Route path='/three/:id' element={<TestThree />}/>
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  )
}

/** 目前要放到app ts才可正常顯示 */
const LayoutSample3: FC<LayoutProps> = () => {
  const LazyThreeComponent = React.lazy(() => import('../../components/RouterSample/TestComponent/TestThree'));

  // 創建router
  const routers = createBrowserRouter([
    {
      path: '/',
      element: <TestIndex />,
      children: [
        {
          path: 'one',
          element: <TestOne />,
          errorElement: <NotFound />
        }, {
          path: 'two/:id',
          element: <TestTwo />,
          errorElement: <NotFound />
        }, {
          path: 'three/:id',
          element: <TestThree />,
          errorElement: <NotFound />
        }
      ]
    }
  ]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TestIndex />}>
          <Route path='/one' element={<TestOne/>} />
          <Route path='/two/:id' element={<TestTwo />} />
          <Route path='/three/:id' element={
            <React.Suspense fallback={<div>Loading</div>}>
              <LazyThreeComponent />
            </React.Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

const Layout: FC<LayoutProps> = () => {

  return (
    <LayoutSample3 />
  )
};

export default Layout;
