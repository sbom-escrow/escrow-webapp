import React, {Fragment,useState,useEffect} from 'react';
import SbomView from '../components/SbomView';
import { Link, useParams } from 'react-router-dom';
import { Table } from 'reactstrap';
import { getMySbom, getVendorName } from '../infrastructure/supabaseClient';
import Sbom from '../infrastructure/Sbom';

const VendorSbom = () => {
  const { id } = useParams();

  const [sbom, updateSbom] = useState()

  useEffect(() => {
    const retrieveSbom = async () => {
      const sbomDto = await getMySbom(id);
      const vendor = await getVendorName();
      if(sbomDto)
        updateSbom(new Sbom({
          name : sbomDto.software_name,
          sbomData : sbomDto.sbom,
          vendor : vendor,
          version: sbomDto.version,
          id: sbomDto.id
      }));
    }
    retrieveSbom();
  }, []);

  return(sbom &&
    <Fragment>
      <SbomView name={sbom.name} version={sbom.version} vendor={sbom.vendor}/>    
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