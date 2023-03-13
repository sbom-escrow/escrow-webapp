import React, {Fragment,useState,useEffect} from 'react';
import SbomView from '../components/SbomView';
import { Link, useParams } from 'react-router-dom';
import { Table, Input } from 'reactstrap';
import { getMySbom, getVendorName, getVendorSubscriptions, getSubscriptionApproved, getSession,setSubscriptionApproval } from '../infrastructure/supabaseClient';
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
    let session = await getSession()
    for(var i = 0; i < subscriptionDtos.length; i++){
      const subscriptionDto = subscriptionDtos[i];    
      const approved = await getSubscriptionApproved(session.user.id,subscriptionDto.client_id,subscriptionDto.sbom_id);
      subs.push(new Subscription({
        client : subscriptionDto.vendors.name,
        client_id : subscriptionDto.client_id,
        vendor_id : session.user.id,
        sbom_id : subscriptionDto.sbom_id,
        cvss : subscriptionDto.cvss,
        approved : approved
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

  const toggleApprove = async (subscription) => {
    await setSubscriptionApproval(subscription.vendor_id, subscription.client_id, subscription.sbom_id, !subscription.approved)    ;
    await getSubscriptions(sbom.id);
  }

  return(sbom && 
    <Fragment>
      <SbomView name={sbom.name} version={sbom.version} vendor={sbom.vendor}/>    
      <div>

        <h4 style={{marginTop:'20px'}}>Subscriptions</h4>   
        {subscriptions && <Table>
          <thead>
            <th>Client</th>
            <th>CVSS</th>
            <th>Approved</th>
          </thead>
          <tbody>
            {subscriptions.map((subscription) => (
                <tr>
                  <td>{subscription.client}</td>
                  <td>{subscription.cvss}</td>
                  <td><Input type="checkbox" checked={subscription.approved} onChange={async () => await toggleApprove(subscription)}/></td>
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