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
	const [vendor, updateVendor] = useState()
	const [image, updateImage] = useState()

  useEffect(() => {
    const syncSession = async () => {
      var sessionTemp = await getSession();
      if(sessionTemp)
    	{
	      var vendorTemp = await getVendorName();
	      updateVendor(vendorTemp)
	      if(vendorTemp == "Vinny The Vendor"){
	      	updateImage(vinny);
	      }
	      else if(vendorTemp == "Clark The Client"){
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
	    		<span style={{paddingRight:'20px', fontSize:'20px'}}>{vendor}</span>
	    		<img style={{width:'60px'}} src={image} alt="avatar" className="position-relative img-fluid" />
	    	</a>
			</Fragment>
		);
	}
	else if (session){
		return(
			<Fragment>
				<Button onClick={logout}>Logout</Button>
			</Fragment>)
	}
};

export default IdentityBar;