import LoginCard from '../components/LoginCard';
import React from 'react';
function Auth() : JSX.Element {
	return (
		<>
			<div className="Container flex flex-col justify-center items-center  w-[35vw] m-auto h-[100vh]">
				<LoginCard />
			</div>
		</>
	);
}

export default Auth;
