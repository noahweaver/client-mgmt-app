import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import './styles/styles.css';
import './styles/StyleWeaver.css'
import App from './App';
import { UserProvider } from './context/UserProvider';




ReactDOM.render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>,
  document.getElementById('root')
);

