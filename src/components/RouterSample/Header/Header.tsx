import React, { FC } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';


interface HeaderProps { }

const Header: FC<HeaderProps> = () => {

  const navigate = useNavigate();
  return (
    <nav>
      {/* navlink */}
      <ul className="nav-items">
        <li>
         NavLink:
        </li>
        <li>
          <NavLink className={({ isActive }) => {
            let reslut = isActive ? "active" : "";
            console.log(isActive)
            return reslut;
          }} to="/">HOME</NavLink>
        </li>
        <li>
          <NavLink to="/page1">PAGE1</NavLink>
        </li>
        <li>
          <NavLink to="/page2">PAGE2</NavLink>
        </li>
      </ul>
      {/* link */}
      <ul className="nav-items">
        <li>
         Link:
        </li>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/page1">PAGE1</Link>
        </li>
        <li>
          <Link to="/page2">PAGE2</Link>
        </li>
      </ul>
      {/* useNavigate */}
      <ul className="nav-items">
        <li>
        useNavigate:
        </li>
        <li onClick={()=> navigate('/')}>
         HOME
        </li>
        <li onClick={()=> navigate('page1')}>
          PAGE1
        </li>
        <li onClick={()=> navigate('/page2')}>
          PAGE2
        </li>
        <li onClick={()=> navigate(-1)}>
          上一層
        </li>
      </ul>
    </nav>
  )
};

export default Header;
