import React, { Component, Fragment, useState } from 'react';
import axios from 'axios';
import {
  Button, UncontrolledAlert, Card, CardImg, CardBody,
  CardTitle, CardSubtitle, CardText, Row, Col, Form, 
  FormGroup, Label, Input
} from 'reactstrap';
import { setVendorName, getVendorName } from '../infrastructure/supabaseClient';

class Account extends Component {
  constructor(){
    super();
    this.state = { 
      vendorName: ""
    }

    this.populateVendorName = this.populateVendorName.bind(this);
    this.updateVendorName = this.updateVendorName.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  componentDidMount() {
    this.populateVendorName();
  }

  async populateVendorName(){
    const vendorName = await getVendorName();
    this.setState((state, props) => {
      return {vendorName: vendorName};
    });
  }

  async updateVendorName(name){
    this.setState((state, props) => {
      return {vendorName: name};
    });
  }

  async saveChanges(){
    await setVendorName(this.state.vendorName);
    await this.populateVendorName();
  }

  render() {
    const vendorName = this.state.vendorName;
    return (
          <Fragment>  
      <Row>
        <Col sm="3"></Col>
        <Col sm="6">
          <Card>
            <CardBody>
              <CardTitle className="h3 mb-2 pt-2 font-weight-bold text-secondary text-center">Login</CardTitle>
              <CardText>
                <Form>
                  <FormGroup>
                    <Label for="vendorName">Vendor Name</Label>
                    <Input type="vendorName" name="vendorName" id="vendorName" value={vendorName} onChange={(e)=>this.updateVendorName(e.target.value)}/>
                  </FormGroup>
                  <Button onClick={this.saveChanges}>Save Changes</Button>
                </Form>
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
      
    </Fragment>
    );
  }
  
}

export default Account;
