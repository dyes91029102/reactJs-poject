import React from "react";
import { FC, useCallback, useState } from "react";

/** 範例1 */
const Child: FC<any> = React.memo(({ reset }) => {
    console.log("重新渲染子節點");
    return (
        <div>
            <button onClick={reset}>重置</button>
        </div>
    );
});

const CallBackSample1: FC<any> = () => {
    const [count, setCount] = useState(0);
    console.log("重新渲染父節點");

    // 記住函數
    const resetCount = useCallback(() => {
        setCount(0);
    }, []);

    return (
        <div>
            <p>數值: {count}</p>
            <button onClick={() => setCount((count) => count + 1)}>加1</button>
            <Child reset={resetCount} />
        </div>
    );
}


const CallBackSample: FC<any> = () => {
    return (<CallBackSample1 />)
}

export default CallBackSample;