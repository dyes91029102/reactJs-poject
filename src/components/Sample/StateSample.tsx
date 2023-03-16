import React, { useState } from 'react';

const StateSample = () => {
    // 宣告一個新的 state 變數，我們叫他「count」
    const [count, setCount] = useState(0);
    // 宣告第二個 state變數，fruit 
    const [fruit, setFruit] = useState('banana');
    return (
        <div>
            <p>數字: {count} </p>
            <button onClick={() => setCount(count + 1)}>
                加1
            </button>
        </div>
    );
}


const StateSample1 = () => {

    const [count, setCount] = useState(4);
    const [count2, setCount2] = useState(4);
    const A = () => {
        // Run Everytime
        setCount(count + 1);
        setCount(count + 1);
        console.log('A: ', count);
    }
    const B = () => {
        // Run only the very first time when your component render
        setCount2(prev => prev + 1);
        setCount2(prev => prev + 1);
        console.log('B: ', count2);
    }
    return (
        <div>
            <button onClick={() => A()}>A</button>
            <button onClick={() => B()}>B</button>
        </div>
    );
}

export default StateSample1;