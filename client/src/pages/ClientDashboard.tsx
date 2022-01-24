import React, { useState } from 'react';
import AddClientForm from '../components/AddClientForm';
import { useUserContext } from '../context/UserProvider';
import { IClient } from '../../../interfaces/IClient';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import EditClientform from '../components/EditClientForm';
import { Button, Modal, Dialog, DialogTitle, DialogContent, Typography, IconButton, DialogActions, styled } from '@mui/material';
import { useTheme, Theme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

type clientdashboardType = {
    clients: Array<IClient>
};

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token") || "";
    if(config.headers){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
  }
  
const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;
    const theme: Theme = useTheme();

    

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
          {children}
          {onClose ? (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
      );
    };
  


const ClientDashboard: React.FC = () => {

    const navigate = useNavigate()
    const [addingClientToggle, setAddingClientToggle] = useState(false);
    const [openClient, setOpenClient] = useState(false);
    const [currentClient, setCurrentClient] = useState<IClient | undefined>();
    const { clients } = useUserContext() as clientdashboardType;
    const theme: Theme = useTheme();

    const buttonStyle = {
        button: {
            '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: '#ffff'
            }
        }
    }

    function handleOpen(client: IClient){
        setCurrentClient(client);
        getSingleClient();
        setOpenClient(true);
    }

    function handleClose(){
        setOpenClient(false);
        setCurrentClient(undefined);
    }

    function handleChange(e: any){
        // const {name, value} = e.target
        // setEditClientInput(prevInputs => ({...prevInputs, [name]: value}))
        console.log("Clientdashboard handlechange was called")
    }

    //GET Single Client by Params
    function getSingleClient(){
        console.log("getSingleClient was called")
        console.log("clientId:", currentClient?._id)
        userAxios.get(`/api/client/${currentClient?._id}`)
          .then(res => {
              console.log(res.data)
              //@ts-ignore
              setCurrentClient(...res.data)
          })
          .then(() => console.log(currentClient))
          .catch((err: any)=> console.log(err))
    }


    return (
        <div>
            <Typography variant='h2'>ROLODEX</Typography>
            <div>
                <p>Client List</p>
                {!addingClientToggle && 
                <Button 
                    variant="outlined" 
                    onClick={() => setAddingClientToggle(prev => !prev)} 
                    sx={buttonStyle.button}>
                    Add New Client
                </Button>}
                {addingClientToggle && 
                <AddClientForm 
                //@ts-ignore
                    setAddingClientToggle={setAddingClientToggle}
                    addingClient={addingClientToggle}
                />}
                <ul>
                    {/* default alphabetical */}
                    {/* add other filters, recent invoices added? */}
                    {/* search bar to search by name or address */}
                    {clients && clients.map((client: IClient) => 
                    <li key={client._id}>
                        <div>
                            <b>Client:</b> {client.firstName} {client.lastName}
                            <br></br>
                            Phone: {client.phone}
                            <br></br>
                            Address: {client.address}
                            <Button 
                            type="button" onClick={() => handleOpen(client)}>Open</Button>
                        </div>
                    </li>)}
                </ul>
                {/* pagination MUI component */}
            </div>
                <BootstrapDialog
                    open={openClient}
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title">
                    <BootstrapDialogTitle 
                        id="customized-dialog-title" 
                        onClose={handleClose}>
                        {currentClient?.firstName}{currentClient?.lastName}</BootstrapDialogTitle>
                    <DialogContent>
                        <Typography><b>Address: </b> {currentClient?.address}</Typography>
                        <Typography><b>Phone: </b>{currentClient?.phone}</Typography>
                        <Typography><b>Email: </b>{currentClient?.email}</Typography>
                        <Typography><b>Notes: </b>{currentClient?.notes}</Typography>
                        <Typography><b>Alternate Phone: </b>{currentClient?.altPhone}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Save changes
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
        </div>
    )
}

export default ClientDashboard
