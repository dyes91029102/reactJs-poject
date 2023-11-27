import React, { FC, useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import "../../scss/pages/login.scss";
import TokenService from "../../services/auth/tokenService";
import { AuthContext, AuthContextType } from "../../context/AuthProvider";
import { useTranslation } from "react-i18next";
import { LocaleArr, LocaleType } from "../../models/localeModel";
import { OptionModel } from "../../models/baseResponse";
import VisuallLoading from "../../components/Common/VisuallLoading/VisuallLoading";
import { useMutation } from "@tanstack/react-query";
import LoginService from "../../services/login/loginService";
import { Controller, SubmitErrorHandler, SubmitHandler, useForm, useWatch } from "react-hook-form";
import styles from "./Login.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
interface LoginProps { }

/** 登入form 的model */
interface IFormLogin {
  account: string;
  password: string;
}
const Login: FC<LoginProps> = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext) as AuthContextType;
  // 語系
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  // 語系清單  
  const langArr: OptionModel[] = LocaleArr;
  const handleUsername = (e: any) => {
    setValue("account", e.target.value);
    // trigger("account");
  };

  const handlePassword = (e: any) => {
    setValue("password", e.target.value);

  };

  // api 呼叫
  const loginMutation = useMutation({
    mutationFn: LoginService.login,
  });

  // 登入
  const onSubmit: SubmitHandler<IFormLogin> = (data) => {
    console.log(data);
    // e.preventDefault();
    loginMutation.mutateAsync({
      account: data.account,
      password: data.password
    }).then(x => {
      console.log(x);
      if (x.success) {
        // 成功的話就把 token 存到 localStorage
        TokenService.setAuthToken(x.data.access_token);
        TokenService.setRefreshToken(x.data.refresh_token);
        // 取得個人資料
        TokenService.setUserInfo(x.data);
        setUser(x.data);

        navigate("/home");
      } else {

        console.log(x)
      }
    })

  };

  const onError: SubmitErrorHandler<IFormLogin> = (errors) => {
    console.log(errors);
  }

  /** 定義欄位 */
  const registerOptions = {
    email: {
      required: "帳號欄位必填",
      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    },
    password: {
      required: "欄位必填",
      minLength: {
        value: 8,
        message: "輸入至少8碼"
      }
    }
  };

  /** 表單schema (套件yup) */
  const schema = yup
    .object({
      account: yup
        .string()
        .required("帳號欄位必填")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          "信箱格式不正確"),
      password: yup
        .string()
        .required("欄位必填")
      // .min(8,"輸入至少8碼")

    })
    .required()

  /** 使用form表單 */
  const { register, handleSubmit, formState: { errors }, setValue, trigger, watch, control } =
    useForm<IFormLogin>({
      resolver: yupResolver(schema),
      mode: "onChange",
      defaultValues: {
        account: "brookchen@chase.com.tw",
        password: "1234"
      }
    });

  // 更換語言
  const changeLanguage = (e: any) => {
    i18n.changeLanguage(e.target.value);
    TokenService.setLanguage(e.target.value);
  };

  // 針對該control 獨立監聽 
  const accountSub = useWatch({ control, name: "account" });
  useEffect(() => {
    if (accountSub) {
      console.log({ accountSub });
    }
  }, [accountSub]);

  // 只要wacth 相關的資料有變動就更新，避免重新渲染加上useEffect
  useEffect(() => {
    const subscription = watch((data) => {
      console.log(data);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className={styles['login-box']}>
      <div className="loginbg"
        style={{
          "backgroundImage": `url("assets/images/login_bg.png")`
        }}>
        <form className="form-signin" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="text-center mb-4">
            <img alt="login logo" className="mb-4"
              src="/assets/images/login_logo.svg"
              style={{ width: "280px", height: "75px" }}
            />
          </div>

          <div className="form-label-group">
            {/* 使用controller 將非可控制的變為可控以利跟其他UI元件方便串接 */}
            <Controller
              name="account"
              control={control}
              render={({ field: {onChange, value} }) => (
                <input type="text"
                  id="inputEmail"
                  className="form-control"
                  value={value}
                  onChange={onChange}
                />
              )
              }
            />

            <label htmlFor="inputEmail">Email</label>
            {
              errors.account && (
                <div className="invalid">
                  {errors.account?.message}
                </div>
              )
            }
          </div>

          <div className="form-label-group">
            <input type="password" id="inputPassword"
              className="form-control"
              placeholder="密碼"
              {...register("password")}
            />
            <label htmlFor="inputPassword">
              {t("PASSWORD")}
            </label>
            {
              errors.password && (
                <div className="invalid">
                  {errors.password?.message}
                </div>
              )
            }
          </div>
          <div className="form-label-group">
            <button
              className="login-link">
              {t("LOGIN")}
              {loginMutation.isIdle ? "" : <VisuallLoading />}
            </button>
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