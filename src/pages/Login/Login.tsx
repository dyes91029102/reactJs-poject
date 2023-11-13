import React, { FC, useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import '../../scss/pages/login.scss';
import lgoinLogo from './../../assets/images/login_logo.svg';
import { getMe, login } from '../../services/loginService';
import { setAuthToken, setRefreshToken, setUserInfo } from '../../utils/token';
import { AuthContext, TodoContextType } from '../../context/authProvider';
interface LoginProps { }

const Login: FC<LoginProps> = () => {

  const navigate = useNavigate()
  const [username, setUsername] = useState('brookchen@chase.com.tw');
  const [password, setPassword] = useState('1234');
  const [errorMessage, setErrorMessage] = useState();
  const { setUser } = useContext(AuthContext) as TodoContextType;
  const handleUsername = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  // 阻止送出表單
  const handleLogin = (e: any) => {

    e.preventDefault();
    login({
      account: username,
      password: password
    })
      .then(x => {
        if (x.success) {
          // 成功的話就把 token 存到 localStorage
          setAuthToken(x.data.access_token);
          setRefreshToken(x.data.refresh_token)
          // 取得個人資料
          setUserInfo(x.data);
          setUser(x.data);
     
          navigate('/home');
        } else {

          return setErrorMessage(x.message);
        }

      })
  };

  return (
    <div>
      <div className='loginbg'>
        <form className='form-signin' onSubmit={handleLogin}>
          <div className='text-center mb-4'>
            <img alt='login logo' className='mb-4'
              src={lgoinLogo}
              style={{ width: '280px', height: '75px' }}
            />
          </div>

          <div className='form-label-group'>
            <input type='text' id='inputEmail'
              className='form-control'
              placeholder='Email'
              value={username}
              onChange={handleUsername} />
            <label htmlFor='inputEmail'>Email</label>
          </div>

          <div className='form-label-group'>
            <input type='password' id='password'
              className='form-control'
              value={password}
              onChange={handlePassword}
            />
            <label htmlFor='inputPassword'>密碼</label>
          </div>
          <div className='form-label-group'>

            <div className='loginBox'>
              <button>登入</button>
            </div>
          </div>
        </form>



      </div >
    </div>
  );

}

export default Login;
