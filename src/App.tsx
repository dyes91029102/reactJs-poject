import React, { FC, useMemo, useState } from 'react';
import './App.css';
import EffectSample from './components/Sample/EffectSample';
import ReactMemoSample from './components/Sample/ReactMemoSample';
import RefSample from './components/Sample/RefSmple';
import StateSample from './components/Sample/StateSample';



const App: FC<any> = () => {
  return (
    <RefSample />
  );
}

export default App;
