import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import ClientDashboard from './pages/ClientDashboard';
import Footer from './components/Footer'






function App() {
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
