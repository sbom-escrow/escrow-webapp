import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Sbom from '../infrastructure/Sbom';
import Subscription from '../infrastructure/Subscription';
import DangerousSoftware from '../data/DangerousSoftware'
import { 
  Table, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Button,
  Form, FormGroup, Label, Input} from 'reactstrap';
import { Link} from 'react-router-dom';
import { searchSboms, getClientSubscriptions, createSubscription, getSubscriptionApproved, getSession, getClientSubscription } from '../infrastructure/supabaseClient';

class Client extends Component {
  constructor(){
    super();
    this.state = { 
      searchTerm:null,
      modal : false,
      searchSboms:[],
      sboms:null,
      cvss:8     
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.populateSboms = this.populateSboms.bind(this);
    this.updateSbomCvss = this.updateSbomCvss.bind(this);
  }

  componentDidMount() {
    this.populateSboms();
  }
  async populateSboms(){
    const sbomDtos = await getClientSubscriptions();
    let session = await getSession()
    var sboms = [];
    if(sbomDtos)
    {
      for(var i = 0; i < sbomDtos.length;i++){
        const sbomDto = sbomDtos[i];
        const approved = await getSubscriptionApproved(sbomDto.vendor_id,session.user.id,sbomDto.sbom_id);
        const sub = await getClientSubscription(sbomDto.sbom_id);
        sboms.push(new Subscription({
          sbom : sbomDto.software_name,
          vendor : sbomDto.vendor_name,
          version: sbomDto.software_version,
          vendor_id : sbomDto.vendor_id,
          client_id : session.user.id,
          sbom_id: sbomDto.sbom_id,
          approved: approved,
          cvss: sub.cvss
        }))          
      }
    }
    this.setState((state, props) => {      
      return {sboms: sboms};
    });
  }

  async setSearchTerm(searchTerm){
    if(!searchTerm)
      searchTerm = ""
    const sbomDtos = await searchSboms(searchTerm);
    this.setState((state, props) => {
      var sboms = [];
      if(sbomDtos)
      {
        for(var i = 0; i < sbomDtos.length;i++){
          const sbomDto = sbomDtos[i];
          sboms.push(new Sbom({
            name : sbomDto.software_name,
            vendor : sbomDto.vendor_name,
            version: sbomDto.software_version,
            id: sbomDto.sbom_id
          }))          
        }
      }
      return {searchSboms: sboms};
    });
  }

  async addSbom(sbom){
    await createSubscription(sbom.id, this.state.cvss);
    await this.populateSboms();
  }

  updateSbomCvss(cvss){
    this.setState((state, props) => {
      return {cvss: cvss};
    });
  }

  toggleModal() {
    this.setState((state, props) => {
      return {modal: !state.modal};
    });
  }  


  render() {
    const sboms = this.state.sboms;
    const cvss = this.state.cvss;
    const modal = this.state.modal;
    const searchTerm = this.state.searchTerm;
    const searchSboms = this.state.searchSboms;
    let modalTable;

    if(searchSboms.length > 0)
    {
      modalTable = <Table hover>
              <thead>              
                <th>Vendor</th>
                <th>Software Name</th>
                <th>Version</th>
                <th>CVSS Threshold</th>
                <th></th>
              </thead>
              <tbody>
                {searchSboms.map((sbom) => {
                  sbom.cvss  = 5;
                  return(
                  <tr>
                    <td>{sbom.vendor}</td>
                    <td>{sbom.name}</td>
                    <td>{sbom.version}</td>
                    <th>
                      <Input type="text" name="cvss" value={cvss} onChange={(e)=>this.updateSbomCvss(e.target.value)} style={{width:'50%'}}/>
                    </th>
                    <td>
                      <Button color="success" onClick={() =>{this.addSbom(sbom)}}>
                        Subscribe
                      </Button>
                    </td>
                  </tr>       
                )})}
              </tbody>          
            </Table>
    }
    else{
      modalTable = <Fragment><div style={{margin:'20px',textAlign:'center', fontSize: 'x-large'}}>No Results</div></Fragment>
    }

    return (sboms &&

      <Fragment>
        <div className="position-relative">                
          <span className="d-block pb-4 h2 text-dark border-bottom border-gray">Subscribed SBOMs</span>          
          <Table hover>
            <thead>
              <th>Vendor</th>
              <th>Software Component Name</th>
              <th>Version</th>
              <th>CVSS Threshold</th>
              <th>Approved?</th>
              <th>Safe?</th>
            </thead>
            <tbody>
              {sboms.map((sbom) => {
                const safe = sbom.sbom != DangerousSoftware.vulnSoftwareName;
                const approvedColor = sbom.approved ? "green" : "red";
                const approvedSymbol = sbom.approved ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill";
                let safeColor = safe ? "green" : "red";
                let safeSymbol = safe ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill";
                if(!sbom.approved){
                  safeColor = "#0d6efd";
                  safeSymbol = "bi bi-question-circle-fill"
                }
                return (                
                <tr>
                  <td>{sbom.vendor}</td>
                  <td>
                    <Link to={sbom.vendor + '/' + 'sbom/' + sbom.sbom_id}>{sbom.sbom}</Link>
                  </td>
                  <td>{sbom.version}</td>
                  <td>{sbom.cvss}</td>
                  <td><i className={approvedSymbol} style={{color:approvedColor}}></i></td>
                  <td><i className={safeSymbol} style={{color:safeColor}}></i></td>
                </tr>       
              )})}
            </tbody>          
          </Table>
          <Row>
            <Col xs='2'>
              <Button color="danger" onClick={this.toggleModal}>
                Find SBOMs
              </Button>
            </Col>
          </Row>
          
        </div>
         <Modal isOpen={modal} toggle={this.toggleModal}  size='xl'>
          <ModalHeader toggle={this.toggleModal}>Find SBOMs</ModalHeader>
          <ModalBody>
            <div>
              <Input type="text" name="search" id="modal-search" placeholder="search..." value={searchTerm} onChange={(e)=>this.setSearchTerm(e.target.value)}/>
            </div>   
            {modalTable}         
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
  
}

export default Client;
