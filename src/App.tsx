import React, { FC, useMemo, useState } from 'react';
import './style/styles.scss';
import './App.scss';
import CallBackSample from './components/Sample/CallbackSample';
import EffectSample from './components/Sample/EffectSample';
import MemoSample from './components/Sample/MemoSample';
import ReactMemoSample from './components/Sample/ReactMemoSample';
import RefSample from './components/Sample/RefSmple';
import StateSample from './components/Sample/StateSample';
import Layout from './pages/Layout/Layout';
import MyComponent from './components/MyComponent/MyComponent';
import RequestSample from './components/RequestSample/RequestSample';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestIndex from './components/RouterSample/TestComponent/TestIndex';
import TestOne from './components/RouterSample/TestComponent/TestOne';
import TestTwo from './components/RouterSample/TestComponent/TestTwo';



// const App: FC<any> = () => {
//   return (
//     <MyComponent />
//   );
// }

/** router 範例 */
const App: FC<any> = () => {
  const LazyThreeComponent = React.lazy(() => import('./components/RouterSample/TestComponent/TestThree'));

  return (
    // <BrowserRouter>
    //   <Routes>
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
    <Layout/>
  );
}

export default App;
