import React, {Fragment} from 'react';
import SbomView from '../components/SbomView';
import { Link, useParams } from 'react-router-dom';
import { Table } from 'reactstrap';

const VendorSbom = () => {
  const { name, version } = useParams();
  return(
    <Fragment>
      <SbomView name={name} version={version} vendor='My Company'/>    
      <div>

        <h4 style={{marginTop:'20px'}}>Subscriptions</h4>   
        <Table>
          <thead>
            <th>Client</th>
            <th>CVSS</th>
          </thead>
          <tbody>
            <tr>
              <td>Small Company</td>
              <td>5.0</td>
            </tr>
            <tr>
              <td>Medium Company</td>
              <td>5.0</td>
            </tr>
            <tr>
              <td>Big Company</td>
              <td>5.0</td>
            </tr>       
          </tbody>          
        </Table>
      </div>
    </Fragment>
  )
}

export default VendorSbom;