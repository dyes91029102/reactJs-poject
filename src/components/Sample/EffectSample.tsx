import { FC, useEffect, useState } from 'react';

/** 範例1 */
const EffectSample1: FC<any> = () => {
    const [count, setCount] = useState(0);

    // 與 componentDidMount 和 componentDidUpdate 類似：
    useEffect(() => {
        console.log('更動數值');
        // 使用瀏覽器 API 更新文件標題
        document.title = `數值: ${count} `;
    });

    return (
        <div>
            <p>數值: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                加1
            </button>
        </div>
    );
}

/** 範例2 */
const EffectSample2: FC<any> = () => {
    const [title, setTitle] = useState('posts');
    const [lists, setLists] = useState([]);
    // 更改title
    const changeTitle = (title: string) => {
        setTitle(title);
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`https://jsonplaceholder.typicode.com/${title}`)
                .then(res => res.json());
                // 設定清單
            setLists(result);
        };
        fetchData();
        // title 作為依賴，更動時，才重新render
    }, [title]);
    console.log(lists);


    return (
        <div className="container">
            <div className="btn-group">
                <button className="btn" onClick={() => changeTitle('posts')}>Post</button>
                <button className="btn" onClick={() => changeTitle('users')}>Users</button>
                <button className="btn" onClick={() => changeTitle('comments')}>Comments</button>
            </div>
            <section>
                <h2>{title}</h2>
                {
                    lists.map((list, index) => {
                        return (
                            <pre key={index}>{JSON.stringify(list)}</pre>
                        )
                    })
                }
            </section>
        </div>
    );
}

const EffectSample: FC<any> = () => (<EffectSample2 />);
export default EffectSample;