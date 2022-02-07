import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import './styles/styles.css';
import './styles/StyleWeaver.css'
import App from './App';
import { UserProvider } from './context/UserProvider';
import { ThemeProvider } from '@mui/material/styles';
import themeCM from './context/ThemeCM'
import './styles/styles.css'
import { InvoiceProvider } from './context/InvoiceProvider';




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

