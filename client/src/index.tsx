import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import './styles/styles.css';
import './styles/StyleWeaver.css'
import App from './App';
import { UserProvider } from './context/UserProvider';
import { ThemeProvider } from '@mui/material/styles';
import theme from './context/Theme'
import './styles/styles.css'




ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
    <UserProvider>
      <App />
    </UserProvider>
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);

