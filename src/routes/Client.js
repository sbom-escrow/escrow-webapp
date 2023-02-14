import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Sbom from '../infrastructure/Sbom';
import { Badge } from 'reactstrap';
import { Table} from 'reactstrap';
import { Link} from 'react-router-dom';

class Client extends Component {
  constructor(){
    super();
    this.state = { 
      searchTerm:null,
      sboms:[
        new Sbom({
          name : 'UpstreamLibrary',
          version : '1.0',
          vendor : 'Other Big Company'
        }),
        new Sbom({
          name : 'TestingSuite',
          version : '1.0.3.2',
          vendor : 'Other Big Company'
        }),
        new Sbom({
          name : 'CryptoPlugin',
          version : '.01b',
          vendor : 'Open Source Foundation'
        })
      ]
    }
  }


  render() {
    const sboms = this.state.sboms;
    return (
      <Fragment>
        <div className="position-relative">                
          <span className="d-block pb-4 h2 text-dark border-bottom border-gray">Subscribed SBOMs</span>          
          <Table hover>
            <thead>
              <th>Vendor</th>
              <th>Software Component Name</th>
              <th>Version</th>
              <th>SHA</th>
            </thead>
            <tbody>
              {sboms.map((sbom) => (
                <tr>
                  <td>{sbom.vendor}</td>
                  <td>
                    <Link to={sbom.vendor + '/' + 'sbom/' + sbom.name + '/' + sbom.version}>{sbom.name}</Link>
                  </td>
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

export default Client;