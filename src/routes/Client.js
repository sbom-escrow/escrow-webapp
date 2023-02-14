import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Sbom from '../infrastructure/Sbom';
import { 
  Table, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Button,
  Form, FormGroup, Label, Input} from 'reactstrap';
import { Link} from 'react-router-dom';

class Client extends Component {
  constructor(){
    super();
    this.state = { 
      searchTerm:null,
      modal : false,
      searchSboms:[],
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

    this.toggleModal = this.toggleModal.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
  }

  setSearchTerm(searchTerm){
    this.setState((state, props) => {
      let searchSboms = [];
      if(searchTerm)
      {
        searchSboms.push(new Sbom({
          name : searchTerm,
          version : '1.0',
          vendor : searchTerm
        }));
      }
      return {searchTerm: searchTerm, searchSboms: searchSboms};
    });
  }

  addSbom(sbom){
    this.setState((state, props) => {
      if(!sbom)
        return {};
      let newSboms = [...state.sboms]
      newSboms.push(sbom)
      
      return {
        sboms: newSboms
      };
    });
  }

  toggleModal() {
    this.setState((state, props) => {
      return {modal: !state.modal};
    });
  }

  search


  render() {
    const sboms = this.state.sboms;
    const modal = this.state.modal;
    const searchTerm = this.state.searchTerm;
    const searchSboms = this.state.searchSboms;
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
            <Table hover>
            <thead>              
              <th>Vendor</th>
              <th>Software Component Name</th>
              <th>Version</th>
              <th>SHA</th>
              <th></th>
            </thead>
            <tbody>
              {searchSboms.map((sbom) => (
                <tr>
                  <td>{sbom.vendor}</td>
                  <td>{sbom.name}</td>
                  <td>{sbom.version}</td>
                  <td>{sbom.sourceSha}</td>
                  <td>
                    <Button color="success" onClick={() =>{this.addSbom(sbom)}}>
                      Subscribe
                    </Button>
                  </td>
                </tr>       
              ))}
            </tbody>          
          </Table>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
  
}

export default Client;