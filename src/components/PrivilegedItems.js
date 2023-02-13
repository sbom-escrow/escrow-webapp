import React, { Fragment } from 'react';
import Identity from '../infrastructure/Identity';
import { Link } from "react-router-dom";

import {
  Container, Row, Col, Form, Input, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

const PrivilegedItems = () => {
	const identity = new Identity();

	if (identity.GetToken())
	{
		return(
	    <Nav className="mrx-auto" navbar>
            
          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold" href="/">
              Home
            </NavLink>
          </NavItem>
          
          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold" href="/vendor">Vendor</NavLink>
          </NavItem>
          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold" href="/client">Client</NavLink>
          </NavItem>
                    
        </Nav>
		);
	}
};

export default PrivilegedItems;