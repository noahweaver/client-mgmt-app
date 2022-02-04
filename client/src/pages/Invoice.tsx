import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IInvoice } from '../../../interfaces/IInvoice';
import { useParams } from 'react-router-dom';

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token") || "";
    if(config.headers){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

// type clientType = {
//     user: {
//         invoices: Array<IInvoice>
//     }
//     deleteClient: (client: IClient | undefined) => void,
//     updateClient: (updatedClient: IClient | undefined) => void
// }


const Invoice: React.FC = () => {


    //state for single invoice
    const [invoice, setInvoice] = useState<IInvoice>();
    const { invoiceId } = useParams();


    //useEffect
    useEffect(() => {
        getSingleInvoice();
    }, [])

    //GET Single Invoice
    function getSingleInvoice(){
        //@ts-ignore
        userAxios.get(`/api/invoice/${invoiceId}`)
            .then(res => {
                //@ts-ignore
                setInvoice(...res.data)
            })
            .catch(err => console.log(err))
    }

    //GET Client by invoice.cliendId
    function getInvoiceClient(){
        console.log("get Invoice Client");

    }

    //Edit invoice
        //modal
        //savePaid
            //datepaid
    function editInvoice(){
        console.log("editInvoice");
    }

    //delete invoice
        //confirmation dialog
    function deleteInvoice(){
        console.log("deleteInvoice")
    }
    
    return (
        <div>
            <p>Individual Invoice Data</p>
            {invoice?.hasPaid ? "This invoice has been paid" : "This invoice has NOT been paid"}
            <br></br>
            {invoice?.invoiceName ? invoice?.invoiceName : "No invoice name listed"}
            <br></br>
            client info
            <br></br>
            invoice info
            <br></br>
            pricing
            <br></br>
            edit button/form
            <br/>
            delete button
            <br/>
            when invoice is checked as paid, needs to save paid date
            <button>Create PDF</button>
        </div>
    )
}

export default Invoice;
