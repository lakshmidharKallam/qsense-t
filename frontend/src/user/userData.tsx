

interface User {		
	name: string;
	role: string;
	password: string;
}

const userData: User[] = [

	{ name: "lakshmidhar", role: "admin", password: "1234" },
	{ name: "user", role: "role", password: "1234" },
	//discarded confidential data
];


const passCheck = (username: string, pass: any) => {
	const user = userData.find((user) => user.name === username);
	if (user && user.password.toString() === pass.toString()) {
		return true;
	}
	return false;
};


const isAdmin = (username: string) => {
	
	const user = userData.find((user) => user.name === username);
	
	if (user && user.role === 'admin') {
		return true; 
	}
	return false; 
};


const login = (username: string, pass: any) => {
	if (passCheck(username, pass)) {
		// If login is successful, save username and role to sessionStorage
		const user = userData.find((user) => user.name === username);
		sessionStorage.setItem(
			'loggedInUser',
			JSON.stringify({
				name: user?.name,	
				role: user?.role,
			})
		);
		return true; // Login successful
	}
	return false; // Login failed
};

// Logout function - Clears user data from sessionStorage
const logout = () => {
	sessionStorage.removeItem('loggedInUser');
};

// Get the currently logged-in user from sessionStorage
const getLoggedInUser = () => {
	const user = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
	return user ? user : null; // Return user object if logged in, otherwise null
};

export { userData, passCheck, isAdmin, login, logout, getLoggedInUser };
