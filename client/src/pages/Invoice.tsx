import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { IInvoice } from '../../../interfaces/IInvoice';
import { useParams } from 'react-router-dom';
import { InvoiceContext } from '../context/InvoiceProvider';
import { Box, Checkbox, Container, FormControlLabel, FormGroup, Table, TableBody, TableHead, TableRow, Theme, Typography, useTheme } from '@mui/material';
import { useUserContext } from '../context/UserProvider';
import { IClient } from '../../../interfaces/IClient';
import { StyledTableCell, StyledTableRow } from '../components/StyledTable';
import { resolve } from 'path/posix';

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token") || "";
    if(config.headers){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

type invoiceType = {
    addInvoice: () => void,
    editInvoice: (invoice: IInvoice | undefined) => void,
    deleteInvoice: () => void
}
 type userType = {
    user: {
        _id: string,
        username: string
    }
 }

const Invoice: React.FC = () => {

    const { addInvoice, editInvoice, deleteInvoice } = useContext(InvoiceContext) as invoiceType
    const { user } = useUserContext() as userType;
    const [invoice, setInvoice] = useState<IInvoice | undefined>();
    const [invoiceTotal, setInvoiceTotal] = useState(0);
    const [client, setClient] = useState<IClient>();
    const { invoiceId } = useParams();
    const theme: Theme = useTheme();

    

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
                setInvoice(...res.data);
                //@ts-ignore
                getSingleClient(...res.data);
                //@ts-ignore
                gatherInvoiceTotal(...res.data)
            })
            .catch(err => console.log(err))

    }

    function getSingleClient(data: any) {
        console.log(data)
        userAxios.get(`/api/client/${data?.clientId}`)
            .then(res => {
                //@ts-ignore
                setClient(...res.data)
            })
            .catch((err: any)=> console.log(err))
    }

    //GET Client by invoice.cliendId
    function getInvoiceClient(){
        console.log("get Invoice Client");

    }

    //Edit invoice
        //modal
        //savePaid
            //datepaid

    function handleDelete(){
        //dialog toggle
        //delete confirmation modal
        deleteInvoice();
    }

    function gatherInvoiceTotal(data: IInvoice){
        if(data){
            const prices = data.tasks.map(task => task.price);
            let sum = 0;
            for (let i = 0; i < prices.length; i++){
                sum += prices[i]
            }
            setInvoiceTotal(sum)
        }
    }
    //createPDF function

    //create printerfriendly

    function handleChecked(e: any){
        //@ts-ignore
        invoice.hasPaid = !invoice?.hasPaid   
        editInvoice(invoice);
    }
                    
    const InvoiceStyle = {
        mx: "auto", 
        border: "2px solid #000", 
        borderRadius: 2,
        margin: "2% 4%",
        height: "1000px",
        boxShadow:" 10px 5px 5px #767676",
        header: {
           backgroundColor: theme.palette.primary.light,
            color: "#000",
            height: "30%",
            border: "1px solid transparent",
            borderRadius: "8px 8px 0 0",
            borderBottom: "2px solid #000",
          userInfo: {
            border: "2px solid #000", 
            borderRadius: 2,
            height: "55%",
            width: "40%",
            float: "right",
            margin: 5,
            padding: 5
          },
          clientInfo: {
            border: "2px solid #000", 
            borderRadius: 2,
            height: "55%",
            width: "40%",
            float: "left",
            margin: 5,
            padding: 3
          }
        },
        invoiceInfo: {
            width: "100%",
            height: "75px",
            margin: "2% 2% 0 2%"
        },
        tasks: {
            width: "90%",
            mx: "auto",
            border: "1px solid #000"
        },
        total: {
            height: "30px",
            border: "1px solid #000",
            borderTop: "1px solid transparent",
            width: "25%",
            float: "right",
            marginRight: "5%",
        },
        payment: {

        }
    }

    return (
    <>
        <Container component="div">
            {/* @ts-ignore */}
            <Typography variant="h5"> <b>Invoice #:</b> {invoice?._id} </Typography>
            {invoice && 
            <FormGroup>
                <FormControlLabel 
                    control={<Checkbox 
                        defaultChecked={invoice?.hasPaid}
                        //@ts-ignore
                        // onChange={(e: any) => { setInvoice((prevState: IInvoice) => ({...prevState, hasPaid: e.target.checked})); handleChecked(); }} />
                        onChange={handleChecked}
                    /> } 
                    label="Has this invoice been paid?" />
            </FormGroup>}
            when invoice is checked as paid, needs to save paid date
            <Box maxWidth="md" sx={ InvoiceStyle }>
            {/* add company info as optional for user model? */}
                <Box sx={InvoiceStyle.header}>
                    <Box sx={InvoiceStyle.header.userInfo}>
                        <Typography><b>Name:</b> {user.username}</Typography>
                        <Typography><b>Employee ID:</b> {user._id}</Typography>
                    </Box>
                    <Box sx={InvoiceStyle.header.clientInfo}>
                        <Typography variant="h6"><b>Bill to:</b> {client?.lastName}, {client?.firstName}</Typography>
                        <Typography variant="body1">{client?.address}</Typography> 
                        <Typography variant="body1">{client?.phone}</Typography> 
                        <Typography variant="body1">{client?.email}</Typography> 
                    </Box>
                </Box>   
                <Box sx={InvoiceStyle.invoiceInfo}>
                    {/* @ts-ignore */}
                    <Typography variant="body1"><b>Invoice #: </b>{invoice._id}</Typography>
                    <Typography variant="body2"> {invoice?.hasPaid ? "This invoice has been paid" : "This invoice has NOT been paid"}</Typography>
                </Box>
            {/* table outlining tasks, descriptions, costs, mamterials etc */}
            <Table sx={InvoiceStyle.tasks}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Task</StyledTableCell>
                        <StyledTableCell align="left">Materials</StyledTableCell>
                        <StyledTableCell align="left">Materials Cost</StyledTableCell>
                        <StyledTableCell align="left">Notes</StyledTableCell>
                        <StyledTableCell align="left">Price</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoice && invoice.tasks.map(task => 
                    //@ts-ignore
                    <StyledTableRow key={task._id}>
                        <StyledTableCell>{task.title}</StyledTableCell>
                        <StyledTableCell>{task.materials}</StyledTableCell>
                        <StyledTableCell>$ {task.materialsCost}</StyledTableCell>
                        <StyledTableCell>{task.notes}</StyledTableCell>
                        <StyledTableCell>$ {task.price}</StyledTableCell>
                    </StyledTableRow>
                        )}
                </TableBody>
            </Table>
            <Box sx={InvoiceStyle.total}>
                <Typography sx={{paddingRight: "25px", textAlign: "end"}}><b>Total:</b> $ {invoiceTotal}</Typography>
            </Box>
            {/* Insert Payment Options Here
            <br/>
            Any other info here
            <br/>
            End of Invoice */}
            
            </Box>
        </Container>
            {/* edit button/form
            <br/>
            delete button */}
            
            
            {/* <button>Create PDF</button> */}

    </>
    )
}

export default Invoice;
