import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';


interface SidebarProps { }

const Sidebar: FC<SidebarProps> = () => (
  <>
    {/* 父層不更動的部分 */}
    <ul className="nav-items">
    <li>
        <NavLink to={`/main/home`}>首頁</NavLink>
      </li>
      <li>
        <NavLink to={`greenhouse`}>溫盤模組</NavLink>
      </li>
      <li>
        <NavLink to={`carbon`}>碳排模組</NavLink>
      </li>
    </ul>
  </>
);

export default Sidebar;
