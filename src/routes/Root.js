import React, { Component, Fragment } from 'react';
import axios from 'axios';
import bigLogo from '../Escrow Crow-2.png';
import vinny from '../VinnyVendorAvatar.png';
import clark from '../ClarkClientAvatar2.png';
import { Badge } from 'reactstrap';

class Root extends Component {

  render() {
    return (
      <Fragment>
        <div className="position-relative" style={{height:'130px',overflow:'hidden',textAlign:'center'}}>                
          <img style={{marginTop:'-188px'}} src={bigLogo} alt="BigLogo" className="position-relative img-fluid" />          
        </div>
        <div className="position-relative">
          <article className="pt-5  text-center" style={{ fontSize: '0.9rem', whiteSpace: 'pre-line' }}>
            To create a greater trust and transparency between software vendors and clients.
          </article>
          <article className="pt-5  text-justify" style={{ fontSize: '0.9rem', whiteSpace: 'pre-line' }}>
             Through the use of a web app we will facilitate the ability of the client to configure how and when the SBoM data will be disclosed, and what policies and procedures all parties will follow in relation to information about the software vendor and/or their SBoM. The clients will be able to do this by configuring the severity of a CVSS that is required for our escrow service to selectively disclose a particular dependency, through viewing graphs of data that we compile about the software product that the vendor has agreed to provide or let us generate, and by being able to audit the automatic disclosure and verification system. Our platform will be able to accomplish these things by using data obtained from NIST, CISA, and other trusted sources, to know when a CVE with a particular CVSS is found on a vendors dependency and then trigger an ethereum/binance smart chain smart contract to cryptographically log that this data was in fact received from the API in the state we are reporting at the time. After this is logged on the blockchain we will send the transaction hash to both the client and vendor along with the dependency, CVE (with CVSS), and mitigation strategies. In order to verify dependency usage in vendor software and the correctness of the SBoM we will use a mix of source code static analysis locally for vendors that provide us with the source, as well as on premise scanning of compiled programs and static source code. We will provide vendors the option to generate their own SBoM where we then use these techniques to verify or we can generate the SBoM with these techniques.
          </article>
        </div>
      </Fragment>
    );
  }
  
}

export default Root;