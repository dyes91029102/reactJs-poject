import React, { FC } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter, createBrowserRouter, Outlet, redirect, RouterProvider, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';



interface LayoutProps { }




const Layout: FC<LayoutProps> = () => {
  const pathName = useLocation();
  return (
    <div className='flex flex-row'>
      {/* 父層不更動的部分 */}

      <nav>
        <Sidebar />
      </nav>
      {/* 子層替換 */}
      <div>
        <Outlet />
      </div>
    </div>
  )
};

export default Layout;
