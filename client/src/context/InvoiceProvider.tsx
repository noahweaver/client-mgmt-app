import React, { useState, useEffect } from 'react';
import axios from 'axios';

const userAxios = axios.create()

const InvoiceContext = React.createContext({})

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token") || "";
    if(config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const InvoiceProvider: React.FC = ({ children }) => {




  return (
        <InvoiceContext.Provider 
            value={{

            }}>
            {children}
  </InvoiceContext.Provider>
  )
};

export default InvoiceProvider;
