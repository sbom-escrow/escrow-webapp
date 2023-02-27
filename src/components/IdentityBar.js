import React, { Fragment, useEffect, useState} from 'react';
import { signOut, getSession } from '../infrastructure/supabaseClient';

import {
  Button
} from 'reactstrap';


const IdentityBar = () => {

	const [session, updateSession] = useState()

  useEffect(() => {
    const syncSession = async () => {
      updateSession(await getSession());
    }
    syncSession();
  }, []);

	const logout= async ()=>{
    await signOut();
    window.location="/login"
  }

	if (session)
	{
		return(
	    <Fragment>
				<Button onClick={logout}>Logout</Button>
			</Fragment>
		);
	}
};

export default IdentityBar;