import React from 'react';
import logo from '../Logo.png';
import IdentityBar from './IdentityBar';
import PrivilegedItems from './PrivilegedItems';



import {
  Container, Row, Col, Form, Input, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';


const Header = () => {
  return(<header>
    <Navbar fixed="top" color="light" light expand="xs" className="border-bottom border-gray bg-white" style={{ height: 80 }}>
    
      <Container>
        <Row noGutters className="position-relative w-100 align-items-center">
          <Col className="d-flex justify-content-xs-start" xs={1}>
            <NavbarBrand className="d-inline-block p-0" href="/" style={{ width: 60}}>
              <img src={logo} alt="logo" className="position-relative img-fluid" />
            </NavbarBrand>
          </Col>

          <Col xs={9} className="d-inline-block justify-content-start">
            <PrivilegedItems/>
          </Col>
          
          <Col xs={2} className="d-inline-block justify-content-end">
            <IdentityBar/>
          </Col>
          
        </Row>
      </Container>
      
    </Navbar>
  </header>)
};

export default Header;