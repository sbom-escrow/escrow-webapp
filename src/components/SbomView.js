import React, { Component, Fragment, useState } from 'react';
import axios from 'axios';
import Sbom from '../infrastructure/Sbom';
import { ListGroup, ListGroupItem } from 'reactstrap';

class SbomView extends Component {
  constructor(props){
    super(props);
    this.state = { 
      sbom: new Sbom({
        name : props.sbom.name,
        version : props.sbom.version,
        vendor : props.sbom.vendor
      })
    }
  }

  render() {
    const sbom = this.state.sbom; 
    return (
      <Fragment>
        <div className="position-relative">                
          <span className="d-block pb-4 h2 text-dark border-bottom border-gray">{sbom.name}</span>          
          <ListGroup>
            <ListGroupItem>
              <strong>Vendor:</strong>
              <span>{sbom.vendor}</span>
            </ListGroupItem>
            <ListGroupItem>
              <strong>Version:</strong>
              <span>{sbom.version}</span>
            </ListGroupItem>
            <ListGroupItem>
              <strong>SHA:</strong>
              <span>{sbom.sourceSha}</span>
            </ListGroupItem>
          </ListGroup>
        </div>
      </Fragment>
    );
  }
}

export default SbomView;