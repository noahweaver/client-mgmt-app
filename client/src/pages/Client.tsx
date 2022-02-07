import React, { useEffect, useState, useContext} from 'react';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { IClient } from '../../../interfaces/IClient';
import EditClientForm from '../components/EditClientForm';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Modal, styled, Theme, Typography, useTheme, useMediaQuery, CardContent, Card, CardActions, CardHeader, Container, Table, TableBody, TableHead, TableRow } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LaunchIcon from '@mui/icons-material/Launch';
import { IInvoice } from '../../../interfaces/IInvoice';
import { useUserContext } from '../context/UserProvider'
import { BootstrapDialog, BootstrapDialogTitle } from '../components/BootstrapDialog';
import { useNavigate } from 'react-router-dom';
import { StyledTableCell, StyledTableRow } from '../components/StyledTable';



const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token") || "";
    if(config.headers){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

type clientType = {
    user: {
        invoices: Array<IInvoice>
    }
    deleteClient: (client: IClient | undefined) => void,
    updateClient: (updatedClient: IClient | undefined) => void
}

const Client: React.FC = () => {

    const [client, setClient] = useState<IClient | undefined>();
    const [isEditing, setIsEditing] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [clientInvoices, setClientInvoices] = useState<Array<IInvoice | undefined>>();

    const [editClient, setEditClient] = useState(false);
    const [editClientInput, setEditClientInput] = useState();
    const { clientId } = useParams();
    const { user: { invoices }, deleteClient, updateClient } = useUserContext() as clientType;
    const navigate = useNavigate();

    useEffect(() => {
        getSingleClient();
        getClientInvoices();
    }, []);


    //get by params
    //maybe map through invoices in context?
    //filter by most recent date
    function getClientInvoices(){
        console.log("getclientInvoices was called")
        //@ts-ignore
        userAxios.get(`/api/invoice/client/${clientId}`)
            .then(res => {
                setClientInvoices(res.data)
            })
            .catch(err => console.log(err))
    }

      //GET Single Client by Params
      function getSingleClient(){
        userAxios.get(`/api/client/${clientId}`)
            .then(res => {
                //@ts-ignore
                setClient(...res.data)
            })
            .then(() => console.log(client))
            .catch((err: any)=> console.log(err))
    }
    

    //ADD new invoice
    //context

    //Delete invoice
    //context?


    //delete function
    //bring in from context

    //edit
    function handleEdit(){
        console.log("handle edit was called")
        //this is where the edit will be submited from
        //look to client dashboard for functionality
        //can I send directly to context?
    }


    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    
    return (
        <>  
            {!isEditing ? 
            <>
            <Card>
                <Typography>
                Change this to some card header: {client?.firstName} {client?.lastName}
                </Typography>
                <CardContent>
                 <Typography sx={client?.moneyOwed ? {color: "red"} : null} variant="h6"><b>Money owed? {client?.moneyOwed ? "YES" : "NO"}</b></Typography>
                <Typography variant="h6"><b>Address: </b> {client?.address}</Typography>
                <Typography variant="h6"><b>Phone: </b>{client?.phone}</Typography>
                <Typography variant="h6"><b>Email: </b>{client?.email}</Typography>
                <Typography variant="h6"><b>Alternate Phone: </b>{client?.altPhone ? client?.altPhone : "Not listed"}</Typography>
                <Typography variant="body1" ><b>Notes: </b>{client?.notes}</Typography>
                </CardContent>
                <CardActions>
                    <IconButton onClick={()=> { setIsEditing(true); }}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => { setOpenDeleteDialog(true); }}>
                    <DeleteIcon />
                </IconButton>
                </CardActions>                
                </Card>                
                <Typography variant="body1" ><b>Invoices: </b>{clientInvoices?.length}</Typography>
                <Container maxWidth="md" sx={{ padding: 0, width: '100vw'}} >
                    <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Open</StyledTableCell>
                            <StyledTableCell align="left">Date Created</StyledTableCell>
                            <StyledTableCell align="left">Invoice Name</StyledTableCell>
                            <StyledTableCell align="left">Invoice Number</StyledTableCell>
                            <StyledTableCell align="left">Paid?</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {clientInvoices && clientInvoices.map(invoice => 
                    //@ts-ignore
                    <StyledTableRow key={invoice._id} >
                        <StyledTableCell sx={invoice?.hasPaid ? {color: "red"} : null} >
                            <IconButton onClick={() => {
                                    //@ts-ignore
                                    navigate(`/invoices/${invoice?._id}`)
                                }}>
                                <LaunchIcon />
                            </IconButton>
                        </StyledTableCell>
                        {/* @ts-ignore */}
                        <StyledTableCell sx={invoice?.hasPaid ? {color: "red"} : null} >{invoice?.created_at.toString()}</StyledTableCell>
                        <StyledTableCell sx={invoice?.hasPaid ? {color: "red"} : null} >{invoice?.invoiceName}</StyledTableCell>
                        {/* @ts-ignore */}
                        <StyledTableCell sx={invoice?.hasPaid ? {color: "red"} : null} >{invoice?._id}</StyledTableCell>
                        <StyledTableCell sx={invoice?.hasPaid ? {color: "red"} : null} >{invoice?.hasPaid ? "YES" : "NO"}</StyledTableCell>
                    </StyledTableRow>
                    )}
                </TableBody>
                    </Table>
                </Container>

            </>
            :
            <>
            <BootstrapDialog
                open={isEditing}
                onClose={() => { }}
                aria-labelledby="customized-dialog-title"
                fullScreen={fullScreen}
            >
            <DialogContent>
                <EditClientForm 
                client={client}
                toggleEdit={(prev: any) => setIsEditing((prev: any) => !prev)}
                handleEdit={handleEdit}
            />
            </DialogContent>
            </BootstrapDialog>
            
            </>
            }

            {/* Delete Client from Client Page */}
        {/* </BootstrapDialog>
        <BootstrapDialog open={openDeleteDialog}>
            <BootstrapDialogTitle 
                id={'confirm-delete'} 
                onClose={() => { setOpenDeleteDialog(false); }}>
                <Typography variant='h6' style={{ padding: "20px"}}>Are you sure you want to delete <b>{props.currentClient?.firstName} {props.currentClient?.lastName}</b> from the database?</Typography>
            </BootstrapDialogTitle>
            <DialogActions>
                <Button onClick={() => { props.handleDelete(); setOpenDeleteDialog(false); }}>Yes, delete {props.currentClient?.firstName}</Button>
            </DialogActions>
            <DialogActions>
                <Button onClick={() => { setOpenDeleteDialog(false); }}>Cancel</Button>
            </DialogActions>
        </BootstrapDialog> */}
    </>
    );
};

export default Client;
