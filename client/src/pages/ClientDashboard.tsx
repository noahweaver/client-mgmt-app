import React, { useState } from 'react';
import AddClientForm from '../components/AddClientForm';
import { useUserContext } from '../context/UserProvider';
import { IClient } from '../../../interfaces/IClient';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import EditClientform from '../components/EditClientForm';
import { Button, Typography} from '@mui/material';
import { useTheme, Theme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ClientModal from '../components/ClientModal';


type clientdashboardType = {
    clients: Array<IClient>,
    deleteClient: (client: IClient | undefined) => void,
    updateClient: (updatedClient: IClient | undefined) => void
};

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token") || "";
    if(config.headers){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});  

const ClientDashboard: React.FC = () => {

    const navigate = useNavigate()
    const [addingClientToggle, setAddingClientToggle] = useState(false);
    const [openClient, setOpenClient] = useState(false);
    const [currentClient, setCurrentClient] = useState<IClient | undefined>();

    const { clients, deleteClient, updateClient } = useUserContext() as clientdashboardType;
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
        // getSingleClient();
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
              setCurrentClient({...res.data})
          })
          .then(() => console.log(currentClient))
          .catch((err: any)=> console.log(err))
    }

    function handleDelete() {
        console.log("handleDelete was called");
        deleteClient(currentClient);
        setCurrentClient(undefined);
        setOpenClient(false);
    }

    function handleEdit(updatedClient: IClient | undefined) {
        updateClient(updatedClient);
        setCurrentClient(updatedClient);
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
                            type="button" onClick={() => {handleOpen(client); setOpenClient(true); }}>Open</Button>
                        </div>
                    </li>)}
                </ul>
                {/* pagination MUI component? */}
            </div>
                {openClient && 
                    <ClientModal 
                        onClose={() => {handleClose(); }}
                        currentClient={currentClient}
                        openClient={openClient}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                }
        </div>
    );
}

export default ClientDashboard
