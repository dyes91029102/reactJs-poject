import React, { FC, useMemo, useState } from 'react';
import './App.css';
import Sample from './components/Sample/Sample';
import Sample1 from './components/Sample/Sample1';
import StateSample from './components/Sample/StateSample';



const App: FC<any> = () => {
  return (
    <StateSample />
  );
}

export default App;
