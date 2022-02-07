import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IClient } from '../../../interfaces/IClient';
import EditClientForm from './EditClientForm';
import { Button, DialogActions, DialogContent, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LaunchIcon from '@mui/icons-material/Launch';
import { BootstrapDialog, BootstrapDialogTitle } from './BootstrapDialog';
import { IInvoice } from '../../../interfaces/IInvoice';
import { useNavigate } from 'react-router-dom';


const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token") || "";
    if(config.headers){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

interface Props {
    onClose: () => void, 
    currentClient: IClient | undefined,
    openClient: boolean,
    handleDelete: () => void,
    handleEdit: (updatedClient: IClient| undefined) => void
}   

const ClientModal: React.FC<Props> = (props) => {

    const [client, setClient] = useState<IClient | undefined>();
    const [isEditing, setIsEditing] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [clientInvoices, setClientInvoices] = useState<Array<IInvoice | undefined>>();

    const [editClient, setEditClient] = useState(false)
    const [editClientInput, setEditClientInput] = useState()
    const { clientId } = useParams();
    const navigate = useNavigate();


    //useEffect
    useEffect(() => {
        getClientInvoices();
        setClient(props.currentClient);
    }, []);

    function getClientInvoices(){
        console.log("getclientInvoices was called")
        //@ts-ignore
        userAxios.get(`/api/invoice/client/${props.currentClient?._id}`)
            .then(res => {
                setClientInvoices(res.data)
            })
            // .then(res => {
            //     //@ts-ignore
            //     setClient(prevState => ({
            //         ...prevState,
            //         invoices: [res.data]
            //     }))
            // })
            .catch(err => console.log(err))
    }
    

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    
    return (
        <>
        
        <BootstrapDialog
            open={props.openClient}
            onClose={props.onClose}
            aria-labelledby="customized-dialog-title"
            fullScreen={fullScreen}
            >
            
            {!isEditing ? 
            <>
            <BootstrapDialogTitle 
                id="customized-dialog-title" 
                onClose={props.onClose}>
                {props.currentClient?.firstName} {props.currentClient?.lastName}
                <IconButton sx={{ color: theme.palette.grey[300] }} 
                    onClick={() => {
                    //@ts-ignore
                    navigate(`/clientdashboard/${client?._id}`)
                 }}>
                    <LaunchIcon />
                </IconButton>
            </BootstrapDialogTitle>
            <DialogContent>
                <Typography sx={props.currentClient?.moneyOwed ? {color: "red"} : null} variant="h6"><b>Money owed? {props.currentClient?.moneyOwed ? "YES" : "NO"}</b></Typography>
                <Typography variant="h6"><b>Address: </b> {props.currentClient?.address}</Typography>
                <Typography variant="h6"><b>Phone: </b>{props.currentClient?.phone}</Typography>
                <Typography variant="h6"><b>Email: </b>{props.currentClient?.email}</Typography>
                <Typography variant="h6"><b>Alternate Phone: </b>{props.currentClient?.altPhone}</Typography>
                <Typography variant="body1" ><b>Notes: </b>{props.currentClient?.notes}</Typography>
                <Typography variant="body1" ><b>Invoices: </b>{clientInvoices?.length}
                </Typography>
            </DialogContent>
            <DialogActions>
                <IconButton onClick={()=> { setIsEditing(true); }}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => { setOpenDeleteDialog(true); }}>
                    <DeleteIcon />
                </IconButton>
            </DialogActions>
            </>
            :
            <>
            <EditClientForm 
                client={props.currentClient}
                toggleEdit={(prev: any) => setIsEditing((prev: any) => !prev)}
                handleEdit={props.handleEdit}
            />
            </>
            }
        </BootstrapDialog>
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
        </BootstrapDialog>
    </>
    );
};

export default ClientModal;
