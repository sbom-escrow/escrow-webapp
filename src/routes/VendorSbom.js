import React from 'react';
import SbomView from '../components/SbomView';
import { Link, useParams } from 'react-router-dom';

const VendorSbom = () => {
  const { name, version } = useParams();
  return(<SbomView name={name} version={version} vendor='My Company'/>)
}

export default VendorSbom;