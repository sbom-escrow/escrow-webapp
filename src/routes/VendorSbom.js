import React, {Fragment,useState,useEffect} from 'react';
import SbomView from '../components/SbomView';
import { Link, useParams } from 'react-router-dom';
import { Table } from 'reactstrap';
import { getMySbom, getVendorName, getVendorSubscriptions } from '../infrastructure/supabaseClient';
import Sbom from '../infrastructure/Sbom';
import Subscription from '../infrastructure/Subscription';

const VendorSbom = () => {
  const { id } = useParams();

  const [sbom, updateSbom] = useState()
  const [subscriptions, updateSubscriptions] = useState(null)

  const getSubscriptions = async (id) => {
    const subscriptionDtos = await getVendorSubscriptions(id);
    if(subscriptionDtos.length == 0)
    {
      updateSubscriptions(null)
      return
    }
    let subs = []
    for(var i = 0; i < subscriptionDtos.length; i++){
      const subscriptionDto = subscriptionDtos[i];
      subs.push(new Subscription({
        client : subscriptionDto.vendors.name,
        cvss : subscriptionDto.cvss       
      }))
    }
    updateSubscriptions(subs)
  }

  useEffect(() => {
    const retrieveSbom = async () => {
      const sbomDto = await getMySbom(id);
      const vendor = await getVendorName();
      if(sbomDto)
      {
        updateSbom(new Sbom({
          name : sbomDto.software_name,
          sbomData : sbomDto.sbom,
          vendor : vendor,
          version: sbomDto.version,
          id: sbomDto.id
        }));
        await getSubscriptions(sbomDto.id);
      }
    }
    retrieveSbom();
  }, []);

  return(sbom && 
    <Fragment>
      <SbomView name={sbom.name} version={sbom.version} vendor={sbom.vendor}/>    
      <div>

        <h4 style={{marginTop:'20px'}}>Subscriptions</h4>   
        {subscriptions && <Table>
          <thead>
            <th>Client</th>
            <th>CVSS</th>
          </thead>
          <tbody>
            {subscriptions.map((subscription) => (
                <tr>
                  <td>{subscription.client}</td>
                  <td>{subscription.cvss}</td>
                </tr>     
              ))}     
          </tbody>          
        </Table>}
        {!subscriptions &&
          <div style={{margin:'20px',textAlign:'center', fontSize: 'x-large'}}>No clients are subscribed to this Software</div>
        }
      </div>
    </Fragment>
  )
}

export default VendorSbom;