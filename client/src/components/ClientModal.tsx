import React, { useEffect, useState, useContext} from 'react';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { IClient } from '../../../interfaces/IClient';
import EditClientForm from './EditClientForm';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Modal, styled, Theme, Typography, useTheme, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { BootstrapDialog, BootstrapDialogTitle } from './BootstrapDialog';

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

const Client: React.FC<Props> = (props) => {

    const [client, setClient] = useState<IClient | undefined>();
    const [isEditing, setIsEditing] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const [editClient, setEditClient] = useState(false)
    const [editClientInput, setEditClientInput] = useState()
    const { clientId } = useParams();

    //useEffect
    useEffect(() => {
        getSingleClient();
        setClient(props.currentClient);
    }, []);

      //GET Single Client by Params
      function getSingleClient(){
          console.log("getSingleClient was called")
          console.log("clientId:", clientId)
          userAxios.get(`/api/client/${clientId}`)
            .then(res => {
                console.log(res.data)
                //@ts-ignore
                setClient(...res.data)
            })
            .then(() => console.log(client))
            .catch((err: any)=> console.log(err))
      }

      //Axios PUT function for edit client info
        //reset state to initInputs (this will either be all empty strings or the client's info) after PUT


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
            </BootstrapDialogTitle>
            <DialogContent>
                <Typography><b>Address: </b> {props.currentClient?.address}</Typography>
                <Typography><b>Phone: </b>{props.currentClient?.phone}</Typography>
                <Typography><b>Email: </b>{props.currentClient?.email}</Typography>
                <Typography><b>Notes: </b>{props.currentClient?.notes}</Typography>
                <Typography><b>Alternate Phone: </b>{props.currentClient?.altPhone}</Typography>
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

export default Client;
