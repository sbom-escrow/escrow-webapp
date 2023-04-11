import React, {Fragment,useState,useEffect} from 'react';
import SbomView from '../components/SbomView';
import { Link, useParams } from 'react-router-dom';
import { Table, Input, Row, Col, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Collapse  } from 'reactstrap';
import { getMySbom, getVendorName, getVendorSubscriptions, getSubscriptionApproved, getSession,setSubscriptionApproval, updateSbom } from '../infrastructure/supabaseClient';
import Sbom from '../infrastructure/Sbom';
import Subscription from '../infrastructure/Subscription';

const VendorSbom = () => {
  const { id } = useParams();

  const [sbom, updateSbomState] = useState()
  const [modal, updateModal] = useState(false)
  const [modalSbom, updateModalSbom] = useState(null)
  const [modalVersion, updateModalVersion] = useState(null)
  const [subscriptions, updateSubscriptions] = useState(null)
  const [collapse, updateCollapse] = useState(false)

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
  const retrieveSbom = async () => {
    const sbomDto = await getMySbom(id);
    const vendor = await getVendorName();
    if(sbomDto)
    {
      updateSbomState(new Sbom({
        name : sbomDto.software_name,
        sbomData : sbomDto.sbom,
        vendor : vendor,
        version: sbomDto.version,          
        id: sbomDto.id
      }));
      await getSubscriptions(sbomDto.id);
    }
  }

  useEffect(() => {   
    retrieveSbom();
  }, []);

  const toggleModal = () =>{    
    if(modal){
      updateModalSbom("");
      updateModalVersion("");
    }
    else{
      updateModalSbom(sbom.sbomData);
      updateModalVersion(sbom.version);
    }
    updateModal(!modal);
  }

  const uploadModal = async () =>{
    await updateSbom(sbom.id,modalVersion,modalSbom);
    updateSbomState(null);
    await retrieveSbom();
    toggleModal();
  }

  const toggleApprove = async (subscription) => {
    await setSubscriptionApproval(subscription.vendor_id, subscription.client_id, subscription.sbom_id, !subscription.approved)    ;
    await getSubscriptions(sbom.id);
  }

  const toggleCollapse = () => {
    updateCollapse(!collapse);
  }

  return(sbom && 
    <Fragment>
      <SbomView sbom={sbom}/>    
      <div>
        {/*<Row>
            <Col xs='2'>
              <Button style={{marginTop:'10px'}} onClick={toggleModal}>
                Update SBOM
              </Button>
            </Col>
          </Row>*/}
        
        {subscriptions && 
        <Fragment>
        <h4 style={{marginTop:'20px'}}>
        <span>Subscriptions</span>
        <Button color="primary" onClick={toggleCollapse} style={{ float:'right'}}>{collapse ? 'Hide' : 'Show' }</Button>
        </h4>  
        <Collapse isOpen={collapse}> 
        <Table>
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
        </Table>
        </Collapse>
        <Collapse isOpen={!collapse} style={{paddingTop:'1em'}}> 
          
          <hr/>
        </Collapse>
        </Fragment>
      }
        {!subscriptions &&
          <Fragment>
          <h4 style={{marginTop:'20px'}}>Subscriptions</h4>   
          <div style={{margin:'20px',textAlign:'center', fontSize: 'x-large'}}>No clients are subscribed to this Software</div>
          </Fragment>
        }
      </div>
      <Modal isOpen={modal} toggle={toggleModal} >
          <ModalHeader toggle={toggleModal}>Upload Software</ModalHeader>
          <ModalBody>
            <Form>
                  <FormGroup>
                    <Label for="modal-version">New Version</Label>
                    <Input type="text" name="modal-version" id="modal-version" value={modalVersion} onChange={(e)=>updateModalVersion(e.target.value)}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="modal-source">New SBOM JSON</Label>
                    <Input type="textarea" name="modal-source" id="modal-source" value={modalSbom} onChange={(e)=>updateModalSbom(e.target.value)}/>
                  </FormGroup>
                  <Button onClick={uploadModal}>Upload</Button>
                </Form>
          </ModalBody>
        </Modal>
    </Fragment>
  )
}

export default VendorSbom;
