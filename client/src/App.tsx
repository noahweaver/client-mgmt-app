import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import ClientDashboard from './pages/ClientDashboard';
import Footer from './components/Footer'
import { useUserContext } from './context/UserProvider';

type userStateType = {
  user: any,
  token: string,
  errMsg: string,
  signup: (credentials: any) => void
}

function App() {

  const { token, signup } = useUserContext() as userStateType

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/clientdashboard" element={<ClientDashboard />}/>
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;
