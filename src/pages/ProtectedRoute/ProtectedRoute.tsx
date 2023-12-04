import React, { FC, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import TokenService from '../../services/auth/tokenService';


type ProtectedRouteProps = {
  children?: React.ReactNode;
  /** 導向頁面 */
  redirectPath?: string;
  /** 是否有該權限 */
  isAllowed?: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = (
  { children, redirectPath = '/main/home', isAllowed = true }) => {
  // 無token 直接回登入頁
  if (!TokenService.getAuthToken()) {
    alert('尚未登入');
    return <Navigate to='/login' replace />
  }

  // 
  if (!isAllowed) {
    alert('權限不足');
    return <Navigate to={redirectPath} replace />
  }
  return (
    <>
      {children}
    </>
  );

}

export default ProtectedRoute;
