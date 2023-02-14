import shajs from 'sha.js';

class Subscription {
	vendor;
	client;
	cvss;

	constructor(data) {
	    this.vendor = data.vendor;
	    this.client = data.client;
	    this.cvss = data.cvss;
  	}
}

export default Sbom;