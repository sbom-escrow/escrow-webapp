import React, { Component, Fragment, useState } from 'react';
import axios from 'axios';
import Sbom from '../infrastructure/Sbom';
import DangerousSoftware from '../data/DangerousSoftware'
import { ListGroup, ListGroupItem, Table} from 'reactstrap';

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
    const vulnerableComponents = sbom.name == DangerousSoftware.vulnSoftwareName ? 
      DangerousSoftware.vulnerableComponents : null;
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
        <div>
          <h4 style={{marginTop:'20px'}}>Vulnerable Components</h4>
          {vulnerableComponents && <Table>
          <thead>
            <th>Component</th>
            <th>Version</th>
            <th>CVE</th>
          </thead>
          <tbody>
            {vulnerableComponents.map((vulnerableComponent) => (
                <tr>
                  <td>{vulnerableComponent.name}</td>
                  <td>{vulnerableComponent.version}</td>
                  <td><a target="_blank" href={vulnerableComponent.url}>{vulnerableComponent.cve}</a></td>
                </tr>     
              ))}     
          </tbody>          
        </Table>}
        {!vulnerableComponents &&
          <div style={{margin:'20px',textAlign:'center', fontSize: 'x-large'}}>This Software is Safe!</div>
        }
        </div>
      </Fragment>
    );
  }
}

export default SbomView;
