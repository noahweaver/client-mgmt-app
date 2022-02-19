import React, { useState } from 'react';
import AddClientForm from '../components/AddClientForm';
import { useUserContext } from '../context/UserProvider';
import { IClient } from '../../../interfaces/IClient';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditClientform from '../components/EditClientForm';
import { Button, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography, useMediaQuery, Container} from '@mui/material';
import { useTheme, Theme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ClientModal from '../components/ClientModal';
import { StyledTableCell, StyledTableRow } from '../components/StyledTable';


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
            margin: '25px 0 10px 25px',
            '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: '#ffff',
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

    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <div>
            <Typography variant='h2' sx={{ m: '25px 0 0 25px'}}>ROLODEX</Typography>
            <div>
                <Button 
                    variant="outlined" 
                    onClick={() => setAddingClientToggle(prev => !prev)} 
                    sx={buttonStyle.button}>
                    Add New Client
                </Button>
                {addingClientToggle && 
                <AddClientForm 
                //@ts-ignore
                    setAddingClientToggle={setAddingClientToggle}
                    addingClient={addingClientToggle}
                />}
                <Container maxWidth="md" sx={{ padding: 0, width: '100vw'}} >
                    <Table stickyHeader={true}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">More Details</StyledTableCell>
                            <StyledTableCell align="left">Client</StyledTableCell>
                            <StyledTableCell align="left">Phone</StyledTableCell>
                            <StyledTableCell align="left">Address</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {/* search bar to search by name or address? */}
                    {clients && clients.map((client: IClient) => 
                    //@ts-ignore
                    <StyledTableRow key={client._id} >
                        <StyledTableCell>
                            <Button 
                                type="button" 
                                onClick={() => {handleOpen(client); setOpenClient(true); }}>
                                Open
                            </Button>
                        </StyledTableCell>
                        <StyledTableCell>{client.lastName}, {client.firstName} </StyledTableCell>
                        <StyledTableCell>{client.phone}</StyledTableCell>
                        <StyledTableCell>{client.address}</StyledTableCell>
                    </StyledTableRow>
                    )}
                    </TableBody>
                    </Table>
                </Container>
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

export default ClientDashboard;
