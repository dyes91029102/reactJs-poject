import { FC, useEffect, useRef, useState } from 'react';

const RefSample1: FC<any> = () => {

    const refData = useRef('初始內容');
    console.log(refData)
    return (
        <div>
        </div>
    )
}

/** 範例2 */
const RefSample2: FC<any> = () => {
    const renderCount = useRef(0);  // { current: 0 }

    useEffect(() => {
        renderCount.current += 1;
    })
    return <p>{renderCount.current}</p>
}

/** 範例3 */
const RefSample3: FC<any> = () => {
    const inputRef = useRef(null);


    const clickHandler = () => {
        let input: any = inputRef.current;
        input.focus();
    }

    return (
        <div>
            <input type='text' ref={inputRef} />
            <button onClick={clickHandler}>Focus</button>
        </div>);
}

/** 範例4 */
const RefSample4: FC<any> = () => {
    const previousCount = useRef(0);
    const [count, setCount] = useState(previousCount.current);

    useEffect(() => {
        previousCount.current = count;
        console.log(count);
    }, [count])

    return (
        <div>
            <p> 上一次數值: {previousCount.current} </p>
            <p> 目前數值: {count} </p>
            <button onClick={() => setCount(count + 1)}>加1</button>
        </div>)
}


const RefSample: FC<any> = () => (<RefSample2 />);
export default RefSample;