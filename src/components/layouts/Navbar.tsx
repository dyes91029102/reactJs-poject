import React, { FC, useContext, useEffect, useState } from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import TokenService from '../../services/auth/tokenService';
import LoginService from '../../services/login/loginService';
import useUserInfoStore from '../../state/useUserInfoStore';


interface PureNavbarProps { }

const PureNavbar: FC<PureNavbarProps> = React.memo((props) => {
  const navigate = useNavigate();  
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    TokenService.setLanguage(lng);
  };
  const logoutMutation = useMutation({
    mutationFn: LoginService.logout
  });
  const tokenRevokeMutation = useMutation({
    mutationFn: LoginService.tokenRevoke
  });

  const { setUserInfo}= useUserInfoStore();
  const handleLogout = (e: any) => {
    tokenRevokeMutation.mutateAsync()
      .then(p => {
        if (p.success) {
          logoutMutation
            .mutateAsync()
            .then(x => {
              if (x.success) {
                // 清除token
                TokenService.removeUserInfo();
                setUserInfo(null);
                useUserInfoStore.persist.clearStorage();
                navigate('/login');
              }
            })
        }
      })


  }


  return (
    <div style={{
      backgroundColor: '#FFF',
      borderBottom: '1px solid #ecf4f7'
    }}>
      <Navbar expand="md" className="bg-body-tertiary d-flex">
        <Container style={{ margin: 0 }}>
          <Navbar.Brand href="/main/home">
            <img alt="" src="/assets/images/logo_header.svg" />
          </Navbar.Brand>

        </Container>
        <Container style={{ margin: 0 }}>
          {/* 縮小圖示 */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* 下拉功能 */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex justify-content-end w-100">
              {/* <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link> */}
              <NavDropdown
                style={{
                  marginRight: '20px'
                }}
                title={
                  <div className='d-flex'>
                    <img style={{
                      borderRadius: '30px',
                      width: '30px',
                      height: '30px'
                    }} src="/assets/images/老皮.png" alt="carbon" />
                  </div>
                }
                id="basic-nav-dropdown">
                {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item> */}
                <NavDropdown.Item onClick={() => changeLanguage('en')}>English</NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeLanguage('zh-TW')}>繁體中文</NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeLanguage('zh-CN')}>简体中文</NavDropdown.Item>
                {/* <NavDropdown.Divider /> */}
                <NavDropdown.Item onClick={handleLogout}>
                  {t('LOGOUT')}
                  
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>

  )}
);

export default PureNavbar;