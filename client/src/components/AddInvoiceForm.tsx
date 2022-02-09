import React, { useState, useContext } from 'react';
import { Box, TextField, TextFieldProps, Button, DialogTitle, Dialog, DialogContent, IconButton, styled, alpha, OutlinedInputProps, useMediaQuery, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useUserContext } from '../context/UserProvider';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme, Theme } from '@mui/material/styles';
import { IInvoice, IAddInvoiceForm } from '../../../interfaces/IInvoice';
import { userInfo } from 'os';
import { RedditTextField } from './RedditTextField'; 
import { InvoiceContext } from '../context/InvoiceProvider';


  interface IInvoiceFormProps {
    setAddingInvoiceToggle: (value: React.SetStateAction<boolean>) => void ,
    addingInvoice: boolean,
    clientId?: string
}

type invoiceFormType ={
    addInvoice: (invoice: any, clientId: string | undefined) => void
}

type clientFormType ={
    user: {
        _id: string
    }
}



const AddInvoiceForm: React.FC<IInvoiceFormProps> = ({ setAddingInvoiceToggle, addingInvoice, clientId }) => {

    const { addInvoice } = useContext(InvoiceContext) as invoiceFormType;
    const { user: { _id } } = useUserContext() as clientFormType;
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
        invoiceName: "",
        tasks: [],
        hasPaid: false,
        notes: "",
        userId: _id,
        }

    const [newInvoice, setNewInvoice] = useState<IAddInvoiceForm>(initInputs);

    function handleChange(e: any){
        const {name, value} = e.target;
        setNewInvoice(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleInvoiceAdd(e: any){
        e.preventDefault();
        setAddingInvoiceToggle(false);
        addInvoice(newInvoice, clientId);
    }
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));


    return (
        <Dialog
            open={addingInvoice}
            fullScreen={fullScreen}
        >
            <DialogTitle
                sx={ DialogStyle.dialogTitle }
            >Adding New Client
                <IconButton
                aria-label="close"
                onClick={() => setAddingInvoiceToggle(false)}
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
                            label="Invoice Name"
                            id="reddit-input"
                            name="invoiceName"
                            value={newInvoice.invoiceName}/>
                            ARRAY OF TASKS TO BE ADDED, CLICK TO ADD NEW FIELDS FOR TASK NAME, MATERIALS, MATERIALS COST, PRICE FOR TASK
                        {/* <RedditTextField 
                        id="reddit-input"   
                            required
                            onChange={handleChange}
                            label="Last name"
                            name="lastName"
                            value={newInvoice.lastName}/> */}
                        <RedditTextField 
                            onChange={handleChange}
                            label="Notes"
                            multiline
                            rows={4}
                            name="notes"
                            value={newInvoice.notes}
                            style={{ gridColumn: '1 / span 2'}}
                        />
                        <FormGroup>
                            <FormControlLabel 
                                control={<Checkbox 
                                    defaultChecked={false}
                                    //@ts-ignore
                                    onChange={(e: any) => setNewInvoice((prevState: IInvoice) => ({...prevState, hasPaid: e.target.checked}))} 
                                    value={newInvoice?.hasPaid} 
                                />} 
                                label="Is this client currently in an 'unpaid' status?" />
                        </FormGroup>
                        <Button 
                            type="submit" 
                            variant="outlined" 
                            onClick={handleInvoiceAdd}
                            sx={DialogStyle.button}
                            >
                            Submit
                        </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
export default AddInvoiceForm;