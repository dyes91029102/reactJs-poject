import React, { FC } from 'react';
import { useParams } from 'react-router-dom';


interface TestTwoProps { }

const TestTwo: FC<TestTwoProps> = () => {
  const obj = useParams()
  console.log(obj);
  return (

    <div className='bg page2'>
      TestTwo Component
    </div>
  )
};

export default TestTwo;
