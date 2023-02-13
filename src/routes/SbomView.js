import React, { Component, Fragment, useState } from 'react';
import axios from 'axios';
import Sbom from '../infrastructure/Sbom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';

const SbomView = () => {
  const { name, version } = useParams();
  const sbom = new Sbom({
    name : name,
    version : version
  });

  return(
    <Fragment>
        <div className="position-relative">                
          <span className="d-block pb-4 h2 text-dark border-bottom border-gray">{sbom.name}</span>          
          <ListGroup>
            <ListGroupItem>
              <strong>Version:</strong>
              <span>{sbom.version}</span>
            </ListGroupItem>
            <ListGroupItem>
              <strong>SHA:</strong>
              <span>{sbom.sourceSha}</span>
            </ListGroupItem>
          </ListGroup>
        </div>
      </Fragment>)
}

export default SbomView;