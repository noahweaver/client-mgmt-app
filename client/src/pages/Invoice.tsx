import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { IInvoice } from '../../../interfaces/IInvoice';
import { useParams } from 'react-router-dom';
import { InvoiceContext } from '../context/InvoiceProvider';
import { Box, Checkbox, Container, FormControlLabel, FormGroup, Table, TableBody, TableHead, TableRow, Theme, Typography, useTheme, IconButton, Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useUserContext } from '../context/UserProvider';
import { IClient } from '../../../interfaces/IClient';
import { StyledTableCell, StyledTableRow } from '../components/StyledTable';
import { useNavigate } from 'react-router-dom';




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
    deleteInvoice: (invoice: IInvoice | undefined) => void,
}
 type userType = {
    user: {
        _id: string,
        username: string
    }
 }
type userInvoiceType = {
    getUserInvoices: () => void
}


const Invoice: React.FC = () => {

    const { addInvoice, editInvoice, deleteInvoice } = useContext(InvoiceContext) as invoiceType
    const { getUserInvoices } = useUserContext() as userInvoiceType;
    const { user } = useUserContext() as userType;
    const [invoice, setInvoice] = useState<IInvoice | undefined>();
    const [invoiceTotal, setInvoiceTotal] = useState(0);
    const [client, setClient] = useState<IClient>();
    const [deleted, setDeleted] = useState(false);
    const { invoiceId } = useParams();
    const theme: Theme = useTheme();
    const navigate = useNavigate();

    

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
        //delete confirmation modal
        deleteInvoice(invoice);
        setDeleted(true);
        setInvoice(undefined);
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

    //createPDF/printer friendly function

    function handleChecked(e: any){
        console.log("handleChecked")
        //@ts-ignore
        invoice.hasPaid = e.target.checked;
        editInvoice(invoice);
        getUserInvoices();
    }
                    
    const InvoiceStyle = {
        border: "2px solid #000", 
        borderRadius: 2,
        margin: "5% auto",
        height: "1000px",
        boxShadow:" 10px 5px 5px #767676",
        backgroundColor: "#ffff",
        width: "85%",
        header: {
           backgroundColor: theme.palette.primary.light,
            color: "#000",
            height: "30%",
            border: "1px solid transparent",
            borderRadius: "8px 8px 0 0",
            borderBottom: "2px solid #000",
            display: "flex",
            padding: 0,
          userInfo: {
            border: "2px solid #000", 
            borderRadius: 2,
            height: "55%",
            width: "40%",
            margin: 5,
            padding: 5
          },
          clientInfo: {
            border: "2px solid #000", 
            borderRadius: 2,
            height: "55%",
            width: "40%",
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
            height: "50px",
            border: "1px solid #000",
            borderTop: "1px solid transparent",
            width: "25%",
            float: "right",
            marginRight: "5%",
        },
        payment: {

        },
        notes: {
            margin: 10,
            border: "2px solid #000", 
            borderRadius: 2,
            height: "100px"
        }
    }

    return (
    <div >
        <Box sx={{ float: "right", display: "flex", flexDirection: "column" }}>
            <IconButton sx={{ fontSize: 13, float: "right" }}onClick={() => {
                //@ts-ignore
                    navigate(`/clientdashboard/${client?._id}`)
                    }}>
                {`Go to ${client?.lastName}, ${client?.firstName}`} <NavigateNextIcon /> 
            </IconButton>
            <IconButton sx={{ fontSize: 13, float: "right" }}onClick={() => {
                //@ts-ignore
                    navigate(`/invoices`)
                    }}>
                Go to Invoices <NavigateNextIcon /> 
            </IconButton>
        </Box>
        {invoice && 
        <>
            <Box sx={{ m: '2% 4%' }}>
            <Typography variant="h5"> <b>Invoice name: </b> {invoice?.invoiceName ? invoice?.invoiceName : "No invoice name listed"} </Typography>
                {/* @ts-ignore */}
                <Typography variant="h5"> <b>Invoice #:</b> {invoice?._id} </Typography>
                <FormGroup>
                    <FormControlLabel 
                        control={<Checkbox 
                            defaultChecked={invoice?.hasPaid}
                            //@ts-ignore
                            // onChange={(e: any) => { setInvoice((prevState: IInvoice) => ({...prevState, hasPaid: e.target.checked})); handleChecked(); }} />
                            onChange={handleChecked}
                        /> } 
                        label="Has this invoice been paid?" />
                </FormGroup>
            DEV NOTE: when invoice is checked as paid, needs to save paid date
            </Box>
            
            <Container maxWidth="md" disableGutters style={{ position: "relative"}} sx={ InvoiceStyle } >
            {/* add company info as optional for user model? */}
                <Container  disableGutters sx={InvoiceStyle.header}>
                    <Container sx={InvoiceStyle.header.userInfo}>
                        <Typography><b>Name:</b> {user.username}</Typography>
                        <Typography><b>Date: </b> {typeof invoice?.createdAt === "string" ? invoice.createdAt.split('T')[0] : "No date"}</Typography>
                    </Container>
                    <Container sx={InvoiceStyle.header.clientInfo}>
                        <Typography variant="h6"><b>Bill to:</b> {client?.lastName}, {client?.firstName}</Typography>
                        <Typography variant="body1">{client?.address}</Typography> 
                        <Typography variant="body1">{client?.phone}</Typography> 
                        <Typography variant="body1">{client?.email}</Typography> 
                    </Container>
                </Container>   
                <Box sx={InvoiceStyle.invoiceInfo}>
                    <Typography variant="h5"> <b>Invoice name: </b> {invoice?.invoiceName ? invoice?.invoiceName : "No invoice name listed"} </Typography>
                    {/* @ts-ignore */}
                    <Typography variant="body1"><b>Invoice #: </b>{invoice._id}</Typography>
                    <Typography variant="body2"> <b> {invoice?.hasPaid ? "This invoice has been paid" : "This invoice has NOT been paid"} </b> </Typography>
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
                <Typography sx={{paddingRight: "25px", textAlign: "end"}}><b>Fees and Taxes:</b> $ {invoice.feesAndTaxes}</Typography>
                <Typography sx={{paddingRight: "25px", textAlign: "end"}}><b>Total:</b> $ {invoice.totalPrice}</Typography>
            </Box>
            <Box>
                <Typography variant="body2" sx={ InvoiceStyle.notes }><b> Notes: </b> {invoice.notes}</Typography> 
            </Box>
            {/* Insert Payment Options Here
            <br/>
            Any other info here
            <br/>
            End of Invoice */}
            <Typography variant="body2" sx={{ position: "absolute", bottom: 0, right: 5 }}><b>Employee ID:</b> {user._id}</Typography>
            </Container>
        </>}
        <Button
                variant="contained"
                color="primary"
                sx={{ marginLeft: "7%"}}>
                Download PDF (Coming in V2!)
        </Button>
        <Box sx={{float: "right"}}>
            <Button> 
                <IconButton>
                    <EditIcon />
                </IconButton>
            </Button>
            <Button>
                <IconButton onClick={() => handleDelete()}>
                    <DeleteIcon />
                </IconButton>
            </Button>
        </Box>
    </div>
    )
}

export default Invoice;
