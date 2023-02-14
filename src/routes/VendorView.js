import React, { Component, Fragment, useState } from 'react';
import axios from 'axios';
import Sbom from '../infrastructure/Sbom';
import { 
  Table, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Button,
  Form, FormGroup, Label, Input} from 'reactstrap';
import { Link} from 'react-router-dom';

class VendorView extends Component {
  constructor(){
    super();
    this.state = { 
      sboms:[
        new Sbom({
          name : 'Test1',
          version : '1.0',
          vendor : 'My Company'
        }),
        new Sbom({
          name : 'Test2',
          version : '1.0.3.2',
          vendor : 'My Company'
        }),
        new Sbom({
          name : 'Test3',
          version : '.01b',
          vendor : 'My Company'
        })
      ],
      modal:false,
      modalName:null,
      modalVersion:null,
      modalFile:null
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.uploadModal = this.uploadModal.bind(this);
    this.setModalName = this.setModalName.bind(this);
    this.setModalVersion = this.setModalVersion.bind(this);
    this.setModalFile = this.setModalFile.bind(this);
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

  setModalFile(file){
    this.setState((state, props) => {
      return {modalFile: file};
    });
  }

  toggleModal() {
    this.setState((state, props) => {
      return {modal: !state.modal};
    });
  }

  uploadModal() {
    this.setState((state, props) => {
      if(!state.modalName || !state.modalVersion)
        return {};
      let newSbom = [...state.sboms]
      newSbom.push(new Sbom({
          name : state.modalName,
          version : state.modalVersion,
          vendor : 'My Company'
        }))
      
      return {
        sboms: newSbom,
        modal:false,
        modalName:null,
        modalVersion:null,
        modalFile:null
      };
    });
  }

  render() {
    const sboms = this.state.sboms;    
    const modal = this.state.modal;
    const modalName = this.state.modalName;
    const modalVersion = this.state.modalVersion;
    const modalFile = this.state.modalFile;
    return (
      <Fragment>
        <div className="position-relative">                
          <span className="d-block pb-4 h2 text-dark border-bottom border-gray">My Company</span>          
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
                    <Link to={'sbom/' + sbom.name + '/' + sbom.version}>{sbom.name}</Link>
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
                    <Label for="modal-source">Source Code</Label>
                    <Input type="file" name="modal-source" id="modal-source" value={modalFile} onChange={(e)=>this.setModalFile(e.target.value)}/>
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