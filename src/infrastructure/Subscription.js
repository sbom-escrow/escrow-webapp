class Subscription {
	vendor;
	vendor_id;
	client;
	client_id;
	sbom_id;
	cvss;
	approved;
	sbom;
	version;

	constructor(data) {
	    this.vendor = data.vendor;
	    this.client = data.client;
	    this.cvss = data.cvss;
	    this.approved = data.approved;
	    this.vendor_id = data.vendor_id;
	    this.client_id = data.client_id;
	    this.sbom_id = data.sbom_id;
	    this.sbom = data.sbom;
	    this.version = data.version;
  	}  	
}

export default Subscription;