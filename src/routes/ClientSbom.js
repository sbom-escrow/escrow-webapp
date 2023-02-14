import React from 'react';
import SbomView from '../components/SbomView';
import { Link, useParams } from 'react-router-dom';

const ClientSbom = () => {
  const { vendor, name, version } = useParams();
  return(<SbomView name={name} version={version} vendor={vendor}/>)
}

export default ClientSbom;