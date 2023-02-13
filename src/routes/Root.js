import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Badge } from 'reactstrap';

class Root extends Component {

  render() {
    return (
      <Fragment>
        <div className="position-relative">
        
          <span className="d-block pb-2 mb-0 h6 text-uppercase text-info font-weight-bold">
            Editor's Pick
            <Badge pill color="success" className="text-uppercase px-2 py-1 ml-3 mb-1 align-middle" style={{ fontSize: '0.75rem' }}>New</Badge>
          </span>
          
          <span className="d-block pb-4 h2 text-dark border-bottom border-gray">React Tutorial</span>
          
          <article className="pt-5 text-secondary text-justify" style={{ fontSize: '0.9rem', whiteSpace: 'pre-line' }}>Stuff Goes Here</article>
          
        </div>
      </Fragment>
    );
  }
  
}

export default Root;