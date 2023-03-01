import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Sbom from '../infrastructure/Sbom';
import { 
  Table, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Button,
  Form, FormGroup, Label, Input} from 'reactstrap';
import { Link} from 'react-router-dom';
import { searchSboms, getClientSubscriptions, createSubscription } from '../infrastructure/supabaseClient';

class Client extends Component {
  constructor(){
    super();
    this.state = { 
      searchTerm:null,
      modal : false,
      searchSboms:[],
      sboms:null      
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.populateSboms = this.populateSboms.bind(this);
  }

  componentDidMount() {
    this.populateSboms();
  }
  async populateSboms(){
    const sbomDtos = await getClientSubscriptions();
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
    await createSubscription(sbom.id);
    await this.populateSboms();
  }

  toggleModal() {
    this.setState((state, props) => {
      return {modal: !state.modal};
    });
  }  


  render() {
    const sboms = this.state.sboms;
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
                <th></th>
              </thead>
              <tbody>
                {searchSboms.map((sbom) => (
                  <tr>
                    <td>{sbom.vendor}</td>
                    <td>{sbom.name}</td>
                    <td>{sbom.version}</td>
                    <td>
                      <Button color="success" onClick={() =>{this.addSbom(sbom)}}>
                        Subscribe
                      </Button>
                    </td>
                  </tr>       
                ))}
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
              <th>SHA</th>
              <th>Safe?</th>
            </thead>
            <tbody>
              {sboms.map((sbom) => (
                <tr>
                  <td>{sbom.vendor}</td>
                  <td>
                    <Link to={sbom.vendor + '/' + 'sbom/' + sbom.id}>{sbom.name}</Link>
                  </td>
                  <td>{sbom.version}</td>
                  <td>{sbom.sourceSha}</td>
                  <td><i class="bi bi-check-circle-fill" style={{color:'green'}}></i></td>
                </tr>       
              ))}
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