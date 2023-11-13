import React, { FC, useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import '../../scss/pages/login.scss';
import lgoinLogo from './../../assets/images/login_logo.svg';
import AuthContext from '../../store/auth-context';
import { login } from '../../services/loginService';
import { setAuthToken } from '../../utils/token';
interface LoginProps { }

const Login: FC<LoginProps> = () => {
  
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const handleUsername = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  // 阻止送出表單
  const handleSubmit = (e: any) => {
    console.log(typeof e)
    e.preventDefault();
    login(username, password)
      .then(data => {
        if (data.ok === 0) {
          return setErrorMessage(data.message);
        }
        // 成功的話就把 token 存到 localStorage
        setAuthToken(data.token);
        navigate('/home');
      })
  };

  console.log('login page')
  let { setIsAuthenticated }: any = useContext(AuthContext);
  const handleLogin = () => {
    setIsAuthenticated(true);
    // 導入主要頁面
    navigate('/');
  }

  return (
    <div>
      <div className='loginbg'>
        <form className='form-signin' onSubmit={handleSubmit}>
          <div className='text-center mb-4'>
            <img alt='login logo' className='mb-4'
              src={lgoinLogo}
              style={{ width: '280px', height: '75px' }}
            />
          </div>

          <div className='form-label-group'>
            <input type='email' id='inputEmail'
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
