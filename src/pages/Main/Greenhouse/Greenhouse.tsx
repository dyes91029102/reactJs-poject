import React, { FC, useContext } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useGetQuery } from '../../../hooks/httpClient';


interface GreenhouseProps { }

export interface TestDataModel {
  id: string;
  name: string;
}

const Greenhouse: FC<GreenhouseProps> = () => {
  const { data, isError, isLoading } = useGetQuery('testData.json');
  const params = useParams();
  const locationObj = useLocation();
  // 路由相關GET參數
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(data, isError, isLoading)

  if (isLoading) {
    return (<div>Loading...</div>);
  }

  if (isError) {
    return (<div>error...</div>);
  }


  const cancelRefreshToken = () => {
  }
  return (
    <div>

      <div className='loginBox'>
        <button onClick={cancelRefreshToken}> 取消refresh token</button>
      </div>
      {locationObj.pathname}
      {data.map((item) => {
        return (<div>{item.id}:{item.name}</div>);
      })}
    </div>
  );
}

export default Greenhouse;
