import React, { FC, useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import '../../scss/pages/login.scss';
import TokenService from '../../services/auth/tokenService';
import { AuthContext, AuthContextType } from '../../context/AuthProvider';
import { useTranslation } from "react-i18next";
import { LocaleArr, LocaleType } from '../../models/localeModel';
import { OptionModel } from '../../models/baseResponse';
import VisuallLoading from '../../components/Common/VisuallLoading/VisuallLoading';
import { useMutation } from '@tanstack/react-query';
import LoginService from '../../services/login/loginService';

interface LoginProps { }

const Login: FC<LoginProps> = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('brookchen@chase.com.tw');
  const [password, setPassword] = useState('1234');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useContext(AuthContext) as AuthContextType;
  // 語系
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  // 語系清單  
  const langArr: OptionModel[] = LocaleArr;

  const handleUsername = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  // api 呼叫
  const loginMutation = useMutation({
    mutationFn: LoginService.login,
  });

  // 登入
  const handleLogin = (e: any) => {
    e.preventDefault();
    loginMutation.mutateAsync({
      account: username,
      password: password
    }).then(x => {
      console.log(x);
      if (x.success) {
        // 成功的話就把 token 存到 localStorage
        TokenService.setAuthToken(x.data.access_token);
        TokenService.setRefreshToken(x.data.refresh_token);
        // 取得個人資料
        TokenService.setUserInfo(x.data);
        setUser(x.data);

        navigate('/home');
      } else {

        return setErrorMessage(x.message);
      }
    })

  };


  // 更換語言
  const changeLanguage = (e: any) => {
    i18n.changeLanguage(e.target.value);
    TokenService.setLanguage(e.target.value);
  };

  return (
    <div>
      <div className='loginbg'
        style={{
          'backgroundImage': `url('assets/images/login_bg.png')`
        }}>
        <form className='form-signin' onSubmit={handleLogin}>
          <div className='text-center mb-4'>
            <img alt='login logo' className='mb-4'
              src="/assets/images/login_logo.svg"
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
            <label htmlFor='inputPassword'>
              {t('PASSWORD')}
            </label>
          </div>
          <div className='form-label-group'>

            <button
              className='login-link'>
              {t('LOGIN')}
              {loginMutation.isIdle ? '' : <VisuallLoading />}
            </button>
            {/* <div className="w-100 position-relative">
              <VisuallLoading>
                <div className='loginBox'>
                </div>
              </VisuallLoading>
            </div> */}
          </div>
        </form>

        {/*  語系 */}
        <div>
          <select defaultValue={lang} onChange={changeLanguage}>
            {
              langArr.map(p => {
                return <option key={p.id} value={p.id}>{p.text}</option>
              })
            }
          </select>

        </div>
      </div >
    </div>
  );

}

export default Login;
