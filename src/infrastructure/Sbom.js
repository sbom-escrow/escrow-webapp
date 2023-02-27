import shajs from 'sha.js';

class Sbom {
	name;
	sourceSha;
	version;
	vendor;
	sbomData;
	id;

	constructor(data) {
	    this.name = data.name;
	    this.sourceSha = shajs('sha256').update(data.name + ':' + data.version).digest('hex');
	    this.version = data.version;
	    this.vendor = data.vendor;
	    this.sbomData = data.sbomData;
	    this.id = data.id;
  	}
}

export default Sbom;