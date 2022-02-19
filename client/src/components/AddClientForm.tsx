import { Box, Button, DialogTitle, Dialog, DialogContent, IconButton, styled, alpha, OutlinedInputProps, useMediaQuery, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React, { useState, useContext } from 'react';
import { useUserContext } from '../context/UserProvider';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme, Theme } from '@mui/material/styles';
import { IClient, IAddClientForm } from '../../../interfaces/IClient';
import { userInfo } from 'os';
import { RedditTextField } from './RedditTextField'; 


  interface IClientFormProps {
    setAddingClientToggle: (value: React.SetStateAction<boolean>) => void ,
    addingClient: boolean,
}

type clientFormType ={
    addNewClient: (newClient: any) => void
    user: {
        _id: string
    }
}

const AddClientForm: React.FC<IClientFormProps> = ({ setAddingClientToggle, addingClient }) => {

    const { addNewClient, user: { _id } } = useUserContext() as clientFormType;
    const theme: Theme = useTheme();

    const DialogStyle = {
        dialogTitle: {
            backgroundColor: theme.palette.primary.main,
            color: '#ffff',
            marginBottom: '25px'
        },
        button: {
            gridColumn: 'span 2',
            width: '50%',
            marginLeft: '25%',
            '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: '#ffff'
            }
        }
    }

    const initInputs = {
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
        altPhone: "",
        email: "",
        notes: "",
        userId: _id,
        // moneyOwed: false,
        }

    const [newClient, setNewClient] = useState<IAddClientForm>(initInputs);

    function handleChange(e: any){
        const {name, value} = e.target;
        setNewClient(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleClientAdd(e: any){
        e.preventDefault();
        setAddingClientToggle(false);
        addNewClient(newClient);
    }
    
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));


    return (
        <Dialog
            open={addingClient}
            fullScreen={fullScreen}
        >
            <DialogTitle
                sx={ DialogStyle.dialogTitle }
            >Adding New Client
                <IconButton
                aria-label="close"
                onClick={() => setAddingClientToggle(false)}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { sm: '1fr 1fr' },
                        gap: 2,
                      }}
                    noValidate
                    autoComplete="off">
                        <RedditTextField 
                            required
                            onChange={handleChange}
                            label="First name"
                            id="reddit-input"
                            name="firstName"
                            value={newClient.firstName}/>
                        <RedditTextField 
                        id="reddit-input"   
                            required
                            onChange={handleChange}
                            label="Last name"
                            name="lastName"
                            value={newClient.lastName}/>
                        <RedditTextField 
                            required
                            onChange={handleChange}
                            label="Address"
                            name="address"
                            value={newClient.address}/>
                        <RedditTextField 
                            required
                            onChange={handleChange}
                            label="Phone Number"
                            name="phone"
                            value={newClient.phone}
                        />
                        <RedditTextField 
                            onChange={handleChange}
                            label="Alternate Phone Number"
                            name="altPhone"
                            value={newClient.altPhone}
                        />
                        <RedditTextField 
                            required
                            onChange={handleChange}
                            label="Email"
                            name="email"
                            value={newClient.email}
                        />
                        <RedditTextField 
                            onChange={handleChange}
                            label="Notes"
                            multiline
                            rows={4}
                            name="notes"
                            value={newClient.notes}
                            style={{ gridColumn: '1 / span 2'}}
                        />
                        {/* <FormGroup>
                            <FormControlLabel 
                                control={<Checkbox 
                                    defaultChecked={false}
                                    //@ts-ignore
                                    onChange={(e: any) => setNewClient((prevState: IClient) => ({...prevState, moneyOwed: e.target.checked}))} 
                                    value={newClient?.moneyOwed} 
                                />} 
                                label="Is this client currently in an 'unpaid' status?" />
                        </FormGroup> */}
                        <Button 
                            type="submit" 
                            variant="outlined" 
                            onClick={handleClientAdd}
                            sx={DialogStyle.button}
                            >
                            Submit
                        </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
export default AddClientForm;