import React, { FC } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter, createBrowserRouter, Outlet, redirect, RouterProvider, useLocation } from 'react-router-dom';
import PureNavbar from '../../components/layouts/PureNavbar';
import Sidebar from '../../components/layouts/Sidebar';



interface LayoutProps { }




const Layout: FC<LayoutProps> = () => {
  console.log('layout')
  const pathName = useLocation();
  return (

    <div>
      {/* Narbar */}
      <div>
        <PureNavbar/>
      </div>
      <div className='d-flex'>
        {/* 父層不更動的部分 */}
        <nav>
          <Sidebar />
        </nav>
        {/* 子層替換 */}
        <div style={{
          width: `calc(100% - 75px)`
        }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
};

export default Layout;
