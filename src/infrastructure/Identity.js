import Cookies from 'universal-cookie';
import { signOut } from './supabaseClient';

class Identity {
	constructor() {
		this.cookies = new Cookies();
	}

	GetToken = () => {
		return this.cookies.get('token');
	}

	Login = (data) => {
    	this.cookies.set('token', data, { path: '/' });
	}

	Logout = () => {
		signOut();
    	this.cookies.remove('token', { path: '/' });
	}
}

export default Identity;