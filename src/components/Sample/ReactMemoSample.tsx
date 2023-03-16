import React, { FC, useState } from "react";

interface ReactMemoSampleProps {
    count: number;
}
/** 子元件 */
const Child: FC<ReactMemoSampleProps> = ({ count }) => {
    console.log("====== Child Render ======");
    return <div>數值: {count}</div>;
};

/** 有加React.memo 的原件 */
const ChildWithMemo: FC<ReactMemoSampleProps> = React.memo(({ count }) => {
    console.log("====== Child with Memo Render ======");
    return <div>數值: {count}</div>;
});

/** 範例1 */
const ReactMemoSample1: FC<any> = () => {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    return (
        <div>
            <button onClick={() => setCount1(count1 + 1)}>按鈕1: {count1} </button>
            <Child count={count1} />
            <ChildWithMemo count={count1} />
            <button onClick={() => setCount2(count2 + 1)}>按鈕2: {count2} </button>
        </div>
    );
}

/** ---------------------------------------------------------- */
interface PersonModel {
    name: string;
    age: number;
    salary: number;
}
interface DemoSalaryProps {
    person: PersonModel;
}

/** 薪資比較函式 相同時，不做更動 */
const isSalaryEqual = (prevProps: DemoSalaryProps, nextProps: DemoSalaryProps) =>
    prevProps.person.salary === nextProps.person.salary;

const DemoSalary: FC<DemoSalaryProps> = React.memo(({ person }) => {

    console.log("====== DemoSalary render ======");
    return <div> 薪水 {person.salary}</div>;
}, isSalaryEqual);

/** 範例2 */
const ReactMemoSample2: FC<any> = () => {
    const [person, setPerson] = useState({
        name: "Ken",
        age: 20,
        salary: 30000
    });

    const raiseSalary = () =>
        setPerson({ ...person, salary: parseInt((person.salary * 1.25).toString()) });

    const raiseAge = () => setPerson({ ...person, age: person.age + 1 });
    return (
        <div>
            <button onClick={raiseSalary}>加薪</button>
            <button onClick={raiseAge}>變老</button>
            <div> 姓名 {person.name}</div>
            <div> 年齡 {person.age}</div>
            <DemoSalary person={person} />
        </div>
    );
}


const ReactMemoSample: FC<any> = () => (<ReactMemoSample2 />);
export default ReactMemoSample;