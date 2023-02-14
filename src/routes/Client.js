import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Vendor from '../infrastructure/Vendor';
import { Badge } from 'reactstrap';

class Client extends Component {
  constructor(){
    super();
    this.state = { 
      searchTerm:null,
      vendors:[
        new Vendor({
          name : 'BigCompnay'
        }),
        new Vendor({
          name : 'MediumCompany'
        }),
        new Vendor({
          name : 'LittleCompany'
        })
      ]
    }
  }


  render() {
    return (
      <Fragment>
        <div className="position-relative">                
          <span className="d-block pb-4 h2 text-dark border-bottom border-gray">Client</span>          
          <article className="pt-5 text-secondary text-justify" style={{ fontSize: '0.9rem', whiteSpace: 'pre-line' }}>
            Stuff Goes Here
          </article>
          
        </div>
      </Fragment>
    );
  }
  
}

export default Client;