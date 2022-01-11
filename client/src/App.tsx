import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Auth from './pages/Auth'
import ClientDashboard from './pages/ClientDashboard';
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import { useUserContext } from './context/UserProvider';

type userStateType = {
  user: any,
  token: string,
  errMsg: string,
  logout: () => void
}

const App: React.FC = () => {

  const { token, logout } = useUserContext() as userStateType

  return (
    <>
      {token && <Nav logout={logout} />}
      <Routes>
        <Route 
        //@ts-ignore
          exact path="/" 
          element={token ? <Navigate to='/home/' /> : <Auth />}
        />
        <Route element={<ProtectedRoute token={token} rest={undefined} />}>
          <Route path='/home' element={<Home />}/>
        </Route>
        <Route  element={<ProtectedRoute token={token} rest={undefined} />}>
          <Route path="/clientdashboard" element={<ClientDashboard />}/>
        </Route>
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;
