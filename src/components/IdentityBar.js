import React, { Fragment } from 'react';
import Identity from '../infrastructure/Identity';

import {
  Button
} from 'reactstrap';


const IdentityBar = () => {
	const identity = new Identity();

	const logout=()=>{
    identity.Logout();
    window.location="/login"
  }

	if (identity.GetToken())
	{
		return(
	    <Fragment>
				<Button onClick={logout}>Logout</Button>
			</Fragment>
		);
	}
};

export default IdentityBar;