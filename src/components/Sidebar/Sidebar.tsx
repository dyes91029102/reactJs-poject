import React, { FC } from "react";
import { NavLink } from "react-router-dom";


interface SidebarProps { }

const Sidebar: FC<SidebarProps> = () => (
  <div className="sidebar-sticky pt-3 scroll">
    <ul className="nav flex-column">
      <li>
        <div className="link-box">
          <NavLink to={`greenhouse`} className="nav-link">
            <img src="/assets/images/module-icon/greenhouse.svg" alt="greenhouse" />
          </NavLink>
        </div>
      </li>
      <li>
        <div className="link-box" >
          <NavLink to={`carbon`} className="nav-link">
            <img src="/assets/images/module-icon/carbon.svg" alt="carbon" />
          </NavLink>
        </div>
      </li>
      <li className="nav-item relative">
        <div className="link-box">
          <NavLink to={`energy`} className="nav-link">
            <img src="/assets/images/module-icon/energy.svg" alt="project" />
          </NavLink>
        </div>
      </li>
    </ul>
  </div>
);

export default Sidebar;
