import React, { FC } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter, createBrowserRouter, Outlet, redirect, RouterProvider, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import CustomNavbar from '../../components/Navbar/Navbar';



interface LayoutProps { }




const Layout: FC<LayoutProps> = () => {
  const pathName = useLocation();
  return (

    <div>
      {/* Narbar */}
      <div>
        <CustomNavbar/>
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
