import React, { FC, useState } from 'react';


interface RequestSampleProps { }

interface UserModel {
  cell: string;
  email: string;
  gender: string;
  phone:string;
  dob: {
    date: Date;
    age: number;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
}

const RequestSample1: FC<RequestSampleProps> = () => {

  const [randomuser, setRandomuser] = useState<UserModel[]>([]);
  // 取得隨機資料
  const getRandomUser = () => {
    fetch('https://randomuser.me/api')
      .then((response) => {
        console.log('not-trans:', response);
        return response.json();
      })
      .then((response) => {
        setRandomuser(response.results);
        console.log('trans-json:', response);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }

  return (
    <div>
      <button onClick={() => getRandomUser()}>取得隨機使用者資料</button>
      <div>
        {
          randomuser.map((p, index)=>{
            return (
            <div key={index}>
              name: {p.name.first}{p.name.last} <br/>
              gender: {p.gender} <br/>
              date: {p.dob.date.toString()} <br/>
              age: {p.dob.age} <br/>
              phone: {p.phone} <br/>
              email: {p.email} <br/>
            </div>
            );
          })
        }
      </div>
    </div>
  )
};

const RequestSample: FC<RequestSampleProps> = () => {
  return (
    <RequestSample1 />
  )
};


export default RequestSample;
