import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IInvoice } from '../../../interfaces/IInvoice';

const userAxios = axios.create()

export const InvoiceContext = React.createContext({})


userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token") || "";
    if(config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export const InvoiceProvider: React.FC = ({ children }) => {

    function addInvoice() {
        console.log("context addInvoice");
    }

    function editInvoice(updatedInvoice: IInvoice) {
        console.log("context editInvoice",updatedInvoice);
        //@ts-ignore
        userAxios.put(`/api/invoice/${updatedInvoice._id}`, updatedInvoice)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    function deleteInvoice() {
        console.log("context editInvoice");
    }


  return (
    <InvoiceContext.Provider 
        value={{
            addInvoice,
            editInvoice,
            deleteInvoice
        }}>
        {children}
    </InvoiceContext.Provider>
  )
};
