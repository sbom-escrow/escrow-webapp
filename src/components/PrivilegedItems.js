import React, { Fragment, useState, useEffect } from 'react';
import { getSession } from '../infrastructure/supabaseClient';
import { Link } from "react-router-dom";

import {
  Container, Row, Col, Form, Input, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

const PrivilegedItems = () => {

  const [session, updateSession] = useState()

  useEffect(() => {
    const syncSession = async () => {
      updateSession(await getSession());
    }
    syncSession();
  }, []);

	if (session)
	{
		return(
	    <Nav className="mrx-auto" navbar>
            
          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold" href="/">
              Home
            </NavLink>
          </NavItem>
          
          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold" href="/vendor">My SBOMs</NavLink>
          </NavItem>
          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold" href="/client">Subscribed SBOMs</NavLink>
          </NavItem>
                    
        </Nav>
		);
	}
};

export default PrivilegedItems;