import { FC, useEffect, useRef, useState } from 'react';

const Sample1: FC<any> = () => {

    const [count, setCount] = useState(0);
    const first = useRef(false);

    useEffect(() => {

        if (first.current === false) {
            // 第一次渲染
            first.current = true;
            console.log('初始呼叫effect')
        } else {
            // 後續更新都跑這邊
            console.log('更新effect');
        }
    });

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>
                點擊
            </button>
            {count}
        </div>
    )
}

export default Sample1;