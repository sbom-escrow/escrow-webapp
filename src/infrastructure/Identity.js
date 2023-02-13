import Cookies from 'universal-cookie';

class Identity {
	constructor() {
		this.cookies = new Cookies();
	}

	GetToken = () => {
		return this.cookies.get('token');
	}

	Login = () => {
    	this.cookies.set('token', 'token', { path: '/' });
	}

	Logout = () => {
    	this.cookies.remove('token', { path: '/' });
	}
}

export default Identity;