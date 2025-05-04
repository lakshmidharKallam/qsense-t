import { BrowserRouter, Routes, Route, Navigate , useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Auth from './pages/Auth.tsx';
import Model from './pages/Model.tsx';
import Savings from './pages/Savings.tsx';
import Admin from './pages/Admin.tsx';
import "./App.css"
import React from 'react';


function RoutesConfig(): JSX.Element {
  const location = useLocation()
  return (
		<>
			{location.pathname !== '/login' && <Navbar />}
			<Routes>
				<Route path="/" element={<Navigate to="/login" />} />
				<Route path="/login" element={<Auth />} />
				<Route path="/model" element={<Model />} />
				<Route path="/savings" element={<Savings />} />
				<Route path="/admin" element={<Admin />} />
				
			</Routes>
		</>
	);
}

export default function App(): JSX.Element {
	return (
		<BrowserRouter basename="/">
      <RoutesConfig/>
		</BrowserRouter>
	);
}
