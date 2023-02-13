import React, { Component, Fragment, useState } from 'react';
import axios from 'axios';
import Sbom from '../infrastructure/Sbom';
import { 
  Table, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Button,
  Form, FormGroup, Label, Input} from 'reactstrap';
import { Link} from 'react-router-dom';

class Vendor extends Component {
  constructor(){
    super();
    this.state = { 
      sboms:[
        new Sbom({
          name : 'Test1',
          version : '1.0'
        }),
        new Sbom({
          name : 'Test2',
          version : '1.0.3.2'
        }),
        new Sbom({
          name : 'Test3',
          version : '.01b'
        })
      ],
      modal:false
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState((state, props) => {
      return {modal: !state.modal};
    });
  }

  render() {
    const sboms = this.state.sboms;    
    const modal = this.state.modal;
    return (
      <Fragment>
        <div className="position-relative">                
          <span className="d-block pb-4 h2 text-dark border-bottom border-gray">Sboms</span>          
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
              <Button color="danger" onClick={this.toggle}>
                Upload Sbom
              </Button>
            </Col>
          </Row>
        </div>
        <Modal isOpen={modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
  
}

export default Vendor;