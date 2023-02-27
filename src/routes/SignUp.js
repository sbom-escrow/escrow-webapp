import React, { Fragment, useState } from 'react';
import { signUp} from '../infrastructure/supabaseClient';

import {
  Button, UncontrolledAlert, Card, CardImg, CardBody,
  CardTitle, CardSubtitle, CardText, Row, Col, Form, 
  FormGroup, Label, Input, FormFeedback
} from 'reactstrap';



const SignUp = () => {
  
  const[email,setEmail]=useState(""); 
  const[passw,setPassw]=useState("");

  const[signUpStatus,setsignUpStatus]=useState(null);

  const submitThisSign= async ()=>{
    const info={email:email,passw:passw}; 
    const { data, error } = await signUp(email, passw);
    const failed = !data.user;
    setsignUpStatus(failed)
  }    

  if(signUpStatus != false){
    return(
      <Fragment>  
        <Row>
          <Col sm="3"></Col>
          <Col sm="6">
            <Card>
              <CardBody>
                <CardTitle className="h3 mb-2 pt-2 font-weight-bold text-secondary text-center">Sign Up</CardTitle>
                <CardText>
                  <Form>
                    <FormGroup>
                      <Label for="email">Email</Label>                    
                      {!signUpStatus && <Input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>}
                      {signUpStatus && <Input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} invalid/>}
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">Password</Label>                    
                      {!signUpStatus && <Input type="password" name="password" id="password" value={passw} onChange={(e)=>setPassw(e.target.value)} />}
                      {signUpStatus && <Input type="password" name="password" id="password" value={passw} onChange={(e)=>setPassw(e.target.value)} invalid/>}
                      <FormFeedback>Invalid Information</FormFeedback>
                    </FormGroup>
                    <Button onClick={submitThisSign}>Sign Up</Button>
                  </Form>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </Fragment>
    )
  }
  else{
    return(
      <Fragment>  
        <Row>
          <Col sm="3"></Col>
          <Col sm="6">
            <Card>
              <CardBody>
                <CardText>
                  <div style={{margin:'20px',textAlign:'center', fontSize: 'x-large'}}>A verification email has been sent to the address provided</div>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </Fragment>
    )    
  }
};

export default SignUp
