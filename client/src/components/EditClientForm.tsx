import React, { useEffect, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { IClient } from '../../../interfaces/IClient';
import { DialogTitle, DialogContent, DialogActions, IconButton, Button, Box, TextField, Theme, useTheme } from '@mui/material';
import { BootstrapDialog, BootstrapDialogTitle } from './BootstrapDialog';
import { RedditTextField } from './RedditTextField'; 

interface Props {
    client: IClient | undefined,
    toggleEdit: React.Dispatch<React.SetStateAction<boolean>>,
    handleEdit: (updatedClient: IClient | undefined) => void
}

export const EditClientForm: React.FC<Props> = (props) => {
    const theme: Theme = useTheme();

    const DialogStyle = {
        dialogTitle: {
            backgroundColor: theme.palette.primary.main,
            color: '#ffff'
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


    const [isChanged, setIsChanged] = useState(false);
    const [inputs, setInputs] = useState<IClient | undefined>();

    useEffect(() => {
        setInputs(props.client);
    }, [])

    function handleEdit(e: any){
        e.preventDefault();
        props.handleEdit(inputs);
        props.toggleEdit((prev: boolean) => !prev);
    }

    function handleChange(e: any){
        setIsChanged(true);
        const { name, value } = e.target
        //@ts-ignore
        setInputs((prevInputs: IClient) => ({...prevInputs, [name]: value}));
    }


    return (
        <>
        <DialogTitle sx={ DialogStyle.dialogTitle }>
            Editing <b>{props.client?.firstName} {props.client?.lastName}</b>
        </DialogTitle>
        <DialogContent>
            <p>this form still needs to be built out.</p>
        <Box
            component="form"
            sx={{
                display: 'grid',
                gridTemplateColumns: { sm: '1fr 1fr' },
                gap: 2,
                }}
            noValidate
            autoComplete="off"
        >
            <RedditTextField 
                required
                onChange={handleChange}
                helperText="First name"
                id="reddit-input"
                name="firstName"
                value={inputs?.firstName}/>
            <RedditTextField 
            id="reddit-input"   
                required
                onChange={handleChange}
                helperText="Last name"
                name="lastName"
                value={inputs?.lastName}/>
            <RedditTextField 
                required
                onChange={handleChange}
                helperText="Address"
                name="address"
                value={inputs?.address}
                multiline
                rows={2}/>
            <RedditTextField 
                required
                onChange={handleChange}
                helperText="Phone Number"
                name="phone"
                value={inputs?.phone}/>
            <RedditTextField 
                onChange={handleChange}
                helperText="Alternate Phone Number"
                name="altPhone"
                value={inputs?.altPhone}/>
            <RedditTextField 
                required
                onChange={handleChange}
                helperText="Email"
                name="email"
                value={inputs?.email}/>
            <RedditTextField 
            onChange={handleChange}
            helperText="Notes"
            multiline
            rows={4}
            name="notes"
            value={inputs?.notes}
            style={{ gridColumn: '1 / span 2'}}/>
            <Button 
                type="submit" 
                variant="outlined" 
                onClick={handleEdit}
                sx={DialogStyle.button}
                >
                Submit
            </Button>
        </Box>
        </DialogContent>
        <DialogActions>
            <IconButton onClick={() => props.toggleEdit((prev) => !prev)}>
                <CancelIcon />
            </IconButton>
            <IconButton disabled={!isChanged} onClick={() => { }}>
                <SaveIcon />
            </IconButton>
        </DialogActions>
        </>
    );
}

export default EditClientForm;
