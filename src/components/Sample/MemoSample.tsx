import React, { FC, useMemo, useState } from 'react';

interface SampleProps { }

const MemoSample1: FC<any> = () => {
  const [count, setCount] = useState(1);
  const [count2, setCount2] = useState(1);
  const starts = useMemo(() => {
    console.log('觸發星星')
    let stars = "";
    for (let i = 1; i <= count2; i += 1) {
      stars += "*";
    }
    return stars;
  }, [count]); //dep array 中的count，假設是元件內某個state 或props

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>點擊</button>
      <div>count:{count}</div>
      <button onClick={() => setCount2(count2 + 1)}>點擊2</button>
      <div>count:{count2}</div>
      <h1>{starts}</h1>
    </div>
  )
}

const MemoSample2: FC<SampleProps> = () => {

  const [radomDepState, setRadomDepState] = useState(1);
  const [count, setCount] = useState(1);
  const random = useMemo(() => {
    console.log('useMemo 亂數');
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
    </div>)
}

const MemoSample:FC<SampleProps> = ()=>{
  return(
    <MemoSample1/>
  );
}

export default MemoSample;
