import React, { Fragment, useState } from 'react';
import Identity from '../infrastructure/Identity';

import {
  Button, UncontrolledAlert, Card, CardImg, CardBody,
  CardTitle, CardSubtitle, CardText, Row, Col, Form, 
  FormGroup, Label, Input
} from 'reactstrap';



const Login = () => {
  
  const[email,setEmail]=useState(""); 
  const[passw,setPassw]=useState("");
  const[dataInput, setDataInput]=useState(""); 
  const submitThis=()=>{
    const info={email:email,passw:passw}; 
    var identity = new Identity();
    identity.Login();
    window.location='/';
  }

  return(
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
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" value={passw} onChange={(e)=>setPassw(e.target.value)}/>
                  </FormGroup>
                  <Button onClick={submitThis}>Login</Button>
                </Form>
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
      
    </Fragment>
  )
};

export default Login