import shajs from 'sha.js';

class Sbom {
	name;
	sourceSha;
	version;
	vendor;
	vendor_id;
	sbomData;
	id;

	constructor(data) {
	    this.name = data.name;
	    this.sourceSha = shajs('sha256').update(data.name + ':' + data.version).digest('hex');
	    this.version = data.version;
	    this.vendor = data.vendor;
	    this.sbomData = data.sbomData;
	    this.id = data.id;
	    this.vendor_id = data.vendor_id;
  	}
}

export default Sbom;