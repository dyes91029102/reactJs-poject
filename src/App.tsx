import React, { FC, useMemo, useState } from 'react';
import './App.css';
import ReactMemoSample from './components/Sample/ReactMemoSample';
import StateSample from './components/Sample/StateSample';



const App: FC<any> = () => {
  return (
    <ReactMemoSample />
  );
}

export default App;
