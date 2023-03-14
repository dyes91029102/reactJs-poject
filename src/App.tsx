import React, { useMemo, useState } from 'react';
import './App.css';

// 範例1
const Sample = () => {
  const [radomDepState, setRadomDepState] = useState(1);
  const [count, setCount] = useState(1);
  const random = useMemo(() => {
    return parseInt((1000 * Math.random()).toString());
  }, [radomDepState]);

  return (
    <div className="App">
      <div className="container">
        <div className="item">
          useMemo: {random}
        </div>
        <div className="item">
          no memo : {parseInt((1000 * Math.random()).toString())}
        </div>
      </div>
      <div>
        <button className="m-1" onClick={() => setCount(count + 1)}>
          元件內其他不相關的state count 點我
        </button>
        Count: {count}
        <button
          className="m-1"
          onClick={() => setRadomDepState(radomDepState + 1)}>
          useMemo依賴的radomDepState 點我
        </button>
        Count: {radomDepState}
      </div>
    </div>
  )
}

// 範例2
const Sample2 = () => {
  const [radomDepState, setRadomDepState] = useState(1);
  const [count, setCount] = useState(1);
  // 產生亂數
  const random = useMemo(() => {
    console.log('產生亂數')
    return parseInt((Math.random() * 1000).toString());
  }, [radomDepState]);

  const createRandomNumber = () => {
    return parseInt((Math.random() * 1000).toString());
  };

  return (
    <div className="App">
      <button onClick={() => setCount(count + 1)}>
        點擊我 useMemo
      </button>
      <div>
        次數: {count}
      </div>
      <div>
         useMemo: {random}
      </div>
      <button onClick={() => setRadomDepState(radomDepState + 1)}>
      點擊我not use Memo
    </button>
    <div>
      次數: {radomDepState}
    </div>
      <div>
        noMemo: {createRandomNumber()}
      </div>
    </div>
  )
}

function App() {
  return (
    <Sample2 />
  );
}

export default App;
