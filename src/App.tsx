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



// const App: FC<any> = () => {
//   return (
//     <MyComponent />
//   );
// }

/** router 範例 */
const App: FC<any> = () => {
  return (
    <Layout />
  );
}

export default App;
