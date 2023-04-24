import React, { FC } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';


interface TestOneProps { }

const TestOne: FC<TestOneProps> = () => {
  const params = useParams();
  const locationObj = useLocation();
  // 路由相關GET參數
  const [searchParams, setSearchParams] = useSearchParams();

  console.log('params:', params);
  console.log('location:', locationObj);
  const id = searchParams.get('id');
  console.log('search:', id);
  const handleChange = () => {
    setSearchParams({
      name: 'brook',
      id: '111'
    })
  }

  return (
    <div className='bg page1'>
      <div>
        TestOne Component
      </div>
      <div>
        Id:{id}
      </div>
      <button onClick={handleChange}>
        更改
      </button>
    </div>)
};

export default TestOne;
