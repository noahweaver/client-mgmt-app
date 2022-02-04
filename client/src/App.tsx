import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Auth from './pages/Auth';
import ClientDashboard from './pages/ClientDashboard';
import ProtectedRoute from './components/ProtectedRoute'
import { useUserContext } from './context/UserProvider';
import InvoiceDashboard from './pages/InvoiceDashboard';
import ClientModal from './components/ClientModal';
import TaskDashboard from './pages/TaskDashboard';
import Client from './pages/Client'
import Invoice from './pages/Invoice';
import Task from './pages/Task';

type userStateType = {
  user: any,
  token: string,
  errMsg: string,
  logout: () => void
};

const App: React.FC = () => {

  const { token, logout } = useUserContext() as userStateType;

  return (
    <>
    {/* MUI css baseline? */}
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
          <Route path="/clientdashboard/*" element={<ClientDashboard />}/>
          <Route path="/clientdashboard/:clientId" element={<Client />}/>
        </Route>
        <Route  element={<ProtectedRoute token={token} rest={undefined} />}>
          <Route path="/invoices/*" element={<InvoiceDashboard />}/>
          <Route path="/invoices/:invoiceId" element={<Invoice />}/>
        </Route>
        <Route  element={<ProtectedRoute token={token} rest={undefined} />}>
          <Route path="/tasks" element={<TaskDashboard />}/>
          <Route path="/tasks/:taskId" element={<Task />}/>

        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
