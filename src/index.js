import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import './index.css';
import Header from './components/Header';
import Login from './routes/Login';
import Root from './routes/Root';
import VendorView from './routes/VendorView';
import Client from './routes/Client';
import VendorSbom from './routes/VendorSbom';
import ClientSbom from './routes/ClientSbom';
import Account from './routes/Account';
import reportWebVitals from './reportWebVitals';
import Cookies from 'universal-cookie';
import { getSession } from './infrastructure/supabaseClient';

const authLoader = async () => {
  var session = await getSession();  
  if(!session){
    throw redirect("login");
  }
  return {};
}

const notAuthedLoader = async () => {
  var session = await getSession();
  console.log(session);
  if(session){
    throw redirect("/");
  }
  return {};
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: notAuthedLoader
  },
  {
    path: "/login",
    element: <Login />,
    loader: notAuthedLoader
  },
  {
    path: "/",
    element: <Root />,
    loader: authLoader
  },
  {
    path: "/vendor",
    element: <VendorView />,
    loader:authLoader
  },
  {
    path: "/account",
    element: <Account />,
    loader:authLoader
  },
  {
      path: "/vendor/sbom/:name/:version",
      element: <VendorSbom />,
      loader:authLoader
  },
  {
    path: "/client",
    element: <Client />,
    loader: authLoader
  },
  {
      path: "/client/:vendor/sbom/:name/:version",
      element: <ClientSbom />,
      loader:authLoader
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <main className="my-5 py-5">
      <Container className="px-0">
        <Row noGutters className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
        
          <Col xs={{ order: 1 }} tag="section" className="py-5 mb-5 py-md-0 mb-md-0">
            <RouterProvider router={router} />
          </Col>
          
        </Row>
      </Container>
    </main>    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
