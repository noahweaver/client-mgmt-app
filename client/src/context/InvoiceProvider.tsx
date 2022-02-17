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

    const [deleteMsg, setDeleteMsg] = useState('');

    //do something with the response
    function addInvoice(invoice: IInvoice, clientId: string | undefined) {
        console.log("context addInvoice", invoice, clientId);
        userAxios.post(`/api/invoice/${clientId}`, invoice)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    function editInvoice(updatedInvoice: IInvoice) {
        console.log("context editInvoice", updatedInvoice);
        //@ts-ignore
        userAxios.put(`/api/invoice/${updatedInvoice._id}`, updatedInvoice)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    //NO ROUTE FOR THIS IN INVOICEROUTER YET
    function deleteInvoice(invoice: IInvoice) {
        console.log("context deleteInvoice");
        //@ts-ignore
        userAxios.delete(`/api/invoice/${invoice._id}`)
            .then((res: any) => {
                setDeleteMsg(JSON.stringify(res.data))
                console.log(res)
            })
            .catch(err => console.log(err))
    }


  return (
    <InvoiceContext.Provider 
        value={{
            addInvoice,
            editInvoice,
            deleteInvoice,
            deleteMsg
        }}>
        {children}
    </InvoiceContext.Provider>
  )
};
