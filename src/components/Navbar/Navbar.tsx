import React, { FC } from 'react';
import { NavLink, Outlet } from 'react-router-dom';


interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => (
  <div>
      {/* 父層不更動的部分 */}
      <ul className="nav-items">
      <li>
        <NavLink to={`/one`}>測試1</NavLink>
      </li>
      <li>
        <NavLink to={`/two/2`}>測試2</NavLink>
      </li>
      <li>
        <NavLink to={`/three/3`}>測試3</NavLink>
      </li>
    </ul>
  </div>
);

export default Navbar;
