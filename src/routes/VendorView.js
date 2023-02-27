import React, { Component, Fragment, useState } from 'react';
import axios from 'axios';
import Sbom from '../infrastructure/Sbom';
import { 
  Table, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Button,
  Form, FormGroup, Label, Input} from 'reactstrap';
import { Link} from 'react-router-dom';
import { uploadSbom, getSboms, getVendorName } from '../infrastructure/supabaseClient';

class VendorView extends Component {
  constructor(){
    super();
    this.state = { 
      sboms:[],
      modal:false,
      modalName:null,
      modalVersion:null,
      modalSbomJson:null,
      vendorName: ""
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.uploadModal = this.uploadModal.bind(this);
    this.setModalName = this.setModalName.bind(this);
    this.setModalVersion = this.setModalVersion.bind(this);
    this.setModalSbomJson = this.setModalSbomJson.bind(this);
    this.populateSboms = this.populateSboms.bind(this);
    this.populateVendorName = this.populateVendorName.bind(this);
  }

  componentDidMount() {
    this.populateSboms();
    this.populateVendorName();
  }
  async populateVendorName(){
    const vendorName = await getVendorName();
    this.setState((state, props) => {
      return {vendorName: vendorName};
    });
  }

  async populateSboms(){
    const sbomDtos = await getSboms();
    this.setState((state, props) => {
      var sboms = [];
      if(sbomDtos)
      {
        for(var i = 0; i < sbomDtos.length;i++){
          const sbomDto = sbomDtos[i];
          sboms.push(new Sbom({
            name : sbomDto.software_name,
            sbomData : sbomDto.sbom,
            vendor : sbomDto.vendor_id,
            version: sbomDto.version,
            id: sbomDto.id
          }))          
        }
      }
      return {sboms: sboms};
    });
  }

  setModalName(name){
    this.setState((state, props) => {
      return {modalName: name};
    });
  }

  setModalVersion(version){
    this.setState((state, props) => {
      return {modalVersion: version};
    });
  }

  setModalSbomJson(sbomJson){
    this.setState((state, props) => {
      return {modalSbomJson: sbomJson};
    });
  }

  toggleModal() {
    this.setState((state, props) => {
      return {modal: !state.modal};
    });
  }

  async uploadModal() {
    console.log(this.state.modalSbomJson)
    await uploadSbom(new Sbom({
      name : this.state.modalName,
      version : this.state.modalVersion,
      sbomData: this.state.modalSbomJson
    }))
    await this.populateSboms()
    this.setState((state, props) => {            
      return {
        modal:false,
        modalName:null,
        modalVersion:null,
        modalSbomJson:null
      };
    });
  }

  render() {
    const sboms = this.state.sboms;    
    const modal = this.state.modal;
    const modalName = this.state.modalName;
    const modalVersion = this.state.modalVersion;
    const modalSbomJson = this.state.modalSbomJson;
    const vendorName = this.state.vendorName;
    return (
      vendorName &&
      <Fragment>
        <div className="position-relative">                
          <span className="d-block pb-4 h2 text-dark border-bottom border-gray">{vendorName}'s Software Components</span>          
          <Table hover>
            <thead>
              <th>Software Component Name</th>
              <th>Version</th>
              <th>SHA</th>
            </thead>
            <tbody>
              {sboms.map((sbom) => (
                <tr>
                  <td>
                    <Link to={'sbom/' + sbom.id}>{sbom.name}</Link>
                  </td>
                  <td>{sbom.version}</td>
                  <td>{sbom.sourceSha}</td>
                </tr>       
              ))}
            </tbody>          
          </Table>
          <Row>
            <Col xs='2'>
              <Button color="danger" onClick={this.toggleModal}>
                Upload Sbom
              </Button>
            </Col>
          </Row>
        </div>
        <Modal isOpen={modal} toggle={this.toggleModal} >
          <ModalHeader toggle={this.toggleModal}>Upload Software</ModalHeader>
          <ModalBody>
            <Form>
                  <FormGroup>
                    <Label for="modal-name">Software Name</Label>
                    <Input type="text" name="modal-name" id="modal-name" value={modalName} onChange={(e)=>this.setModalName(e.target.value)}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="modal-version">Version</Label>
                    <Input type="text" name="modal-version" id="modal-version" value={modalVersion} onChange={(e)=>this.setModalVersion(e.target.value)}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="modal-source">SBOM JSON</Label>
                    <Input type="textarea" name="modal-source" id="modal-source" value={modalSbomJson} onChange={(e)=>this.setModalSbomJson(e.target.value)}/>
                  </FormGroup>
                  <Button onClick={this.uploadModal}>Upload</Button>
                </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
  
}

export default VendorView;
