import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Badge } from 'reactstrap';

class Root extends Component {

  render() {
    return (
      <Fragment>
        <div className="position-relative">                
          <span className="d-block pb-4 h2 text-dark border-bottom border-gray">Escrow</span>          
          <article className="pt-5 text-secondary text-justify" style={{ fontSize: '0.9rem', whiteSpace: 'pre-line' }}>
            Stuff Goes Here
          </article>
          
        </div>
      </Fragment>
    );
  }
  
}

export default Root;