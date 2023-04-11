import React, { Component, Fragment, useState } from 'react';
import axios from 'axios';
import Sbom from '../infrastructure/Sbom';
import DangerousSoftware from '../data/DangerousSoftware'
import { Collapse, ListGroup, ListGroupItem, Table, Button} from 'reactstrap';

class SbomView extends Component {
  constructor(props){
    super(props);
    this.state = { 
      sbom: new Sbom({
        name : props.sbom.name,
        version : props.sbom.version,
        vendor : props.sbom.vendor
      }),
      collapse: false
    }
    this.toggle = this.toggle.bind(this);
  }

 toggle() {
    this.setState({ collapse: !this.state.collapse });
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
          
          {vulnerableComponents && 
          <Fragment>
          <h4 style={{marginTop:'20px'}}>
            <span>Vulnerable Components</span>
            <Button color="primary" onClick={this.toggle} style={{ float:'right'}}>{this.state.collapse ? 'Hide' : 'Show' }</Button>
          </h4>
          
          <Collapse isOpen={this.state.collapse}>
          <Table>
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
        </Table>
        </Collapse>
        <Collapse isOpen={!this.state.collapse} style={{paddingTop:'1em'}}>
          <hr/>
        </Collapse>
        </Fragment>
      }
        {!vulnerableComponents &&
          <Fragment>
          <h4 style={{marginTop:'20px'}}>Vulnerable Components</h4>
          <div style={{margin:'20px',textAlign:'center', fontSize: 'x-large'}}>This Software is Safe!</div>
          </Fragment>
        }
        </div>
      </Fragment>
    );
  }
}

export default SbomView;
