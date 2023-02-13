import React, { Component, Fragment, useState } from 'react';
import axios from 'axios';
import Sbom from '../infrastructure/Sbom';
import { Table } from 'reactstrap';
import { Link} from 'react-router-dom';

class Vendor extends Component {
  constructor(){
    super();
    this.state = { sboms:[
      new Sbom({
        name : 'Test1',
        version : '1.0'
      }),
      new Sbom({
        name : 'Test2',
        version : '1.0.3.2'
      }),
      new Sbom({
        name : 'Test3',
        version : '.01b'
      })
    ]}
  }

  render() {
    const sboms = this.state.sboms;    
    return (
      <Fragment>
        <div className="position-relative">                
          <span className="d-block pb-4 h2 text-dark border-bottom border-gray">Sboms</span>          
          <Table hover>
            <thead>
              <th>Software Component Name</th>
              <th>Version</th>
              <th>SHA</th>
            </thead>
            <tbody>
              {sboms.map((sbom) => (
                <tr>
                  <td><Link to={'sbom/' + sbom.name + '/' + sbom.version}>{sbom.name}</Link></td>
                  <td>{sbom.version}</td>
                  <td>{sbom.sourceSha}</td>
                </tr>       
              ))}
            </tbody>          
          </Table>          
        </div>
      </Fragment>
    );
  }
  
}

export default Vendor;