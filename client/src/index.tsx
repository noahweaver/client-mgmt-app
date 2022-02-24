import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { UserProvider } from './context/UserProvider';
import { ThemeProvider } from '@mui/material';
import themeCM from './context/ThemeCM'
import { InvoiceProvider } from './context/InvoiceProvider';
import './styles/styles.css';
import './styles/StyleWeaver.css'




ReactDOM.render(
  <Router>
    <ThemeProvider theme={themeCM}>
    <UserProvider>
      <InvoiceProvider>
      <App />
      </InvoiceProvider>
    </UserProvider>
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);

