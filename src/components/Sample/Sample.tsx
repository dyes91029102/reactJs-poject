import React, { FC, useMemo, useState } from 'react';

interface SampleProps { }

const Sample: FC<SampleProps> = () => {

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

export default Sample;
