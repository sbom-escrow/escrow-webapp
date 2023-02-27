import React, {Fragment,useState,useEffect} from 'react';
import SbomView from '../components/SbomView';
import { Link, useParams } from 'react-router-dom';
import { getVendorSbom, getVendorName } from '../infrastructure/supabaseClient';
import Sbom from '../infrastructure/Sbom';

const ClientSbom = () => {
  const { vendor, id } = useParams();

  const [sbom, updateSbom] = useState()

  useEffect(() => {
    const retrieveSbom = async () => {
      const sbomDto = await getVendorSbom(id);
      console.log(sbomDto)
      if(sbomDto)
        updateSbom(new Sbom({
          name : sbomDto.software_name,
          vendor : sbomDto.vendor_name,
          version: sbomDto.software_version,
          id: sbomDto.sbom_id
      }));
    }
    retrieveSbom();
  }, []);
  return(sbom && <SbomView name={sbom.name} version={sbom.version} vendor={sbom.vendor}/>)
}

export default ClientSbom;