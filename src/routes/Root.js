import React, { Component, Fragment } from 'react';
import axios from 'axios';
import bigLogo from '../Escrow Crow-2.png';
import { Badge } from 'reactstrap';

class Root extends Component {

  render() {
    return (
      <Fragment>
        <div className="position-relative" style={{height:'130px',overflow:'hidden'}}>                
          <img style={{marginTop:'-188px'}} src={bigLogo} alt="BigLogo" className="position-relative img-fluid" />          
        </div>
      </Fragment>
    );
  }
  
}

export default Root;