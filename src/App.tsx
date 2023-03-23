import React, { FC, useMemo, useState } from 'react';
import './App.css';
import CallBackSample from './components/Sample/CallbackSample';
import EffectSample from './components/Sample/EffectSample';
import MemoSample from './components/Sample/MemoSample';
import ReactMemoSample from './components/Sample/ReactMemoSample';
import RefSample from './components/Sample/RefSmple';
import StateSample from './components/Sample/StateSample';



const App: FC<any> = () => {
  return (
    <MemoSample />
  );
}

export default App;
