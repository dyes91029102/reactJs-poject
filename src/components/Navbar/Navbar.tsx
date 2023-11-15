import React, { FC } from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import LoginService from '../../services/login.service';
import TokenService from '../../services/token.service';


interface CustomNavbarProps { }

const CustomNavbar: FC<CustomNavbarProps> = () => {

  const navigate = useNavigate();
  const handleLogout = (e: any) => {
    LoginService.logout()
      .then(x => {
        if (x.success) {
          // 清除token
          TokenService.removeUserInfo();
          navigate('/login');
        }
      });
  }

  return (
    <div style={{
      backgroundColor: '#FFF',
      borderBottom: '1px solid #ecf4f7'
    }}>
      <Navbar expand="md" className="bg-body-tertiary d-flex">
        <Container style={{ margin: 0 }}>
          <Navbar.Brand href="/home">
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
                <NavDropdown.Item>選擇語言</NavDropdown.Item>
                {/* <NavDropdown.Divider /> */}
                <NavDropdown.Item onClick={handleLogout}>
                  登出
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>

  )
};

export default CustomNavbar;
