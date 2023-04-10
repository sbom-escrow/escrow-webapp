import React, { Fragment, useEffect, useState} from 'react';
import { signOut, getSession } from '../infrastructure/supabaseClient';
import vinny from '../VinnyVendorAvatar.png';
import clark from '../ClarkClientAvatar.png';
import { getVendorName } from '../infrastructure/supabaseClient';

import {
  Button
} from 'reactstrap';


const IdentityBar = () => {

	const [session, updateSession] = useState()
	const [image, updateImage] = useState()

  useEffect(() => {
    const syncSession = async () => {
      var sessionTemp = await getSession();
      if(sessionTemp)
    	{
	      var vendor = await getVendorName();
	      if(vendor == "Demo Vendor"){
	      	updateImage(vinny);
	      }
	      else if(vendor == "Demo Client"){
	      	updateImage(clark);
	      }
    	}
      updateSession(sessionTemp);
    }
    syncSession();
  }, []);

	const logout= async ()=>{
    await signOut();
    window.location="/login"
  }

  const account= async ()=>{
    window.location="/account"
  }

	if (session && image)
	{
		return(
	    <Fragment>
	    	<a onClick={logout} style={{right:"0",position:"absolute",display:"inline-block",top:"0"}}>
	    		<img style={{width:'60px'}} src={image} alt="avatar" className="position-relative img-fluid" />
	    	</a>
			</Fragment>
		);
	}
	else if (session){
		return(<Button onClick={logout}>Logout</Button>)
	}
};

export default IdentityBar;