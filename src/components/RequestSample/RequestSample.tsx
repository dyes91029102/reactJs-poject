import React, { FC, useState } from 'react';
import axios from 'axios';

interface RequestSampleProps { }

interface UserModel {
  cell: string;
  email: string;
  gender: string;
  phone: string;
  dob: {
    date: Date;
    age: number;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    country: string;
  }
}

interface ProfileModel {
  id: number;
  name: string;
  age: number;
}

/** fetch 使用方法  */
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
        console.log('fetch:', response);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }


  // 取得隨機資料
  const postRandomUser = () => {
    // 資料
    const userData: ProfileModel = {
      id: 3,
      name: 'brook2',
      age: 30
    };
    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }

    fetch('http://localhost:9999/profiles/', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(userData)
    }).then((response) => {
      console.log('fetch:', response.json());
    })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }

  return (
    <div>
      <div>
        <button onClick={() => getRandomUser()}>fetch取得隨機使用者資料</button>
        <div>
          {
            randomuser.map((p, index) => {
              return (
                <div key={index}>
                  name: {p.name.first}{p.name.last} <br />
                  gender: {p.gender} <br />
                  date: {p.dob.date.toString()} <br />
                  age: {p.dob.age} <br />
                  phone: {p.phone} <br />
                  email: {p.email} <br />
                </div>
              );
            })
          }
        </div>
      </div>

      <div>
        <button onClick={() => postRandomUser()}>post使用者資料</button>
      </div>
    </div>
  )
};

/** axios 使用方法  */
const RequestSample2: FC<RequestSampleProps> = () => {

  const [randomuser, setRandomuser] = useState<UserModel[]>([]);


  // 取得隨機資料
  const getRandomUser = () => {
    axios.get('https://randomuser.me/api')
      .then((response) => {
        console.log('axios:', response);
        let datas: UserModel[] = response.data.results;
        if (datas.length > 0) {
          setRandomuser(datas);
        }
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }

  // 用參數方式撰寫
  const getRandomUser2 = () => {
    axios.get('https://randomuser.me/api', {
      params: {
        gender: 'female',
        nat: 'us'
      }
    })
      .then((response) => {
        let datas: UserModel[] = response.data.results;
        if (datas.length > 0) {
          setRandomuser(datas);
        }
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }

  // 整個物件
  const getRandomUser3 = () => {
    axios({
      method: 'get',
      url: 'https://randomuser.me/api/?gender=male&nat=us'
    })
      .then((response) => {
        let datas: UserModel[] = response.data.results;
        if (datas.length > 0) {
          setRandomuser(datas);
        }
      })
      .catch((error) => console.log(error))
  }

  // 共用寫法
  const instance = axios.create({
    baseURL: 'https://randomuser.me/api',
    timeout: 10000
  });
  const getRandomUser4 = () => {
    instance.get('', {
      params: {
        gender: 'male',
        nat: 'us'
      }
    })
      .then((response) => {
        let datas: UserModel[] = response.data.results;
        if (datas.length > 0) {
          setRandomuser(datas);
        }
      })
      .catch((error) => console.log(error))
  }

  // 取得隨機資料
  const postRandomUser = () => {
    // 資料
    const userData: ProfileModel = {
      id: 4,
      name: 'brook2',
      age: 30
    };
    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
    axios.post('http://localhost:9999/profiles/', userData, {
      headers: headers
    })
      .then((response) => {
        console.log('res:', response);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }


  return (
    <div>
      <div>
        <button onClick={() => getRandomUser()}>axios取得隨機使用者資料</button>
        <button onClick={() => getRandomUser2()}>axios取得指定female資料使用者資料</button>
        <button onClick={() => getRandomUser3()}>axios取得指定male資料使用者資料</button>
        <button onClick={() => getRandomUser4()}>axios create instance取得指定male資料使用者資料</button>
        <div>
          {
            randomuser.map((p, index) => {
              return (
                <div key={index}>
                  name: {p.name.first}{p.name.last} <br />
                  gender: {p.gender} <br />
                  date: {p.dob.date.toString()} <br />
                  age: {p.dob.age} <br />
                  phone: {p.phone} <br />
                  email: {p.email} <br />
                  country: {p.location.country} <br />
                </div>
              );
            })
          }
        </div>
      </div>
      <div>
        <button onClick={() => postRandomUser()}>axios post資料使用者資料</button>

      </div>
    </div>
  )
};

const RequestSample: FC<RequestSampleProps> = () => {
  return (
    <RequestSample2 />
  )
};


export default RequestSample;
