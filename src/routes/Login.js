import React, { Fragment, useState } from 'react';
import { signInWithEmail, signUp, getSession} from '../infrastructure/supabaseClient';

import {
  Button, UncontrolledAlert, Card, CardImg, CardBody,
  CardTitle, CardSubtitle, CardText, Row, Col, Form, 
  FormGroup, Label, Input, FormFeedback
} from 'reactstrap';



const Login = () => {
  
  const[email,setEmail]=useState(""); 
  const[passw,setPassw]=useState("");
  const[dataInput, setDataInput]=useState(""); 

  const[failedLogin, setFailedLogin]=useState(""); 

  const submitThisSign= async ()=>{
    const info={email:email,passw:passw}; 
    await signUp(email, passw);
  }  
  
  const submitThisLogin= async ()=>{
    const info={email:email,passw:passw}; 
    let { data, error } = await signInWithEmail(email, passw);    
    if(await getSession())
    {
      window.location='/';
    }
    else{
      setFailedLogin(true);
    }
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
                    {!failedLogin && <Input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>}
                    {failedLogin && <Input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} invalid/>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>                    
                    {!failedLogin && <Input type="password" name="password" id="password" value={passw} onChange={(e)=>setPassw(e.target.value)} />}
                    {failedLogin && <Input type="password" name="password" id="password" value={passw} onChange={(e)=>setPassw(e.target.value)} invalid/>}
                    <FormFeedback>Invalid Credentials</FormFeedback>
                  </FormGroup>
                  <Button onClick={submitThisLogin}>Login</Button>
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
