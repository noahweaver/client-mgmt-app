import { Box, TextField, TextFieldProps, Button, DialogTitle, Dialog, DialogContent, IconButton, styled, alpha, OutlinedInputProps } from '@mui/material'
import React from 'react'
import { useUserContext } from '../context/UserProvider'
import CloseIcon from '@mui/icons-material/Close';
import { useTheme, Theme } from '@mui/material/styles';



interface IClientFormProps {
    setAddingClientToggle: (value: React.SetStateAction<boolean>) => void ,
    addingClient: boolean,
    handleChange: (e: any) => void
}

type clientFormType ={
    addNewClient: () => void
}

const RedditTextField = styled((props: TextFieldProps) => (
    <TextField
      InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
      {...props}
    />
  ))(({ theme }) => ({
      border: '1px solid #000',
      borderRadius: 4,
      backgroundColor: '#00000025',
    '& .MuiFilledInput-root': {
      border: '1px solid #e2e2e1',
      overflow: 'hidden',
      borderRadius: 4,
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&.Mui-focused': {
        backgroundColor: 'transparent',
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));



const AddClientForm: React.FC<IClientFormProps> = ({ setAddingClientToggle, addingClient, handleChange }) => {

    const { addNewClient } = useUserContext() as clientFormType;
    const theme: Theme = useTheme();
    
    const DialogHeaderStyle = {
        dialogTitle: {
            backgroundColor: theme.palette.primary.main,
            color: '#ffff'
        }
    }


    function handleClientAdd(e: any){
        e.preventDefault();
        setAddingClientToggle(false);
        addNewClient();
    }

    return (
        <Dialog
            open={addingClient}
        >
            <DialogTitle
                sx={ DialogHeaderStyle.dialogTitle }
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
            <p>Form in progress of being built</p>
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
                            id="reddit-input"/>
                        <RedditTextField 
                        id="reddit-input"   
                            required
                            onChange={handleChange}
                            label="Last name"/>
                        <RedditTextField 
                            required
                            onChange={handleChange}
                            label="Address"/>
                        <RedditTextField 
                            required
                            onChange={handleChange}
                            label="Phone Number"
                        />
                        <RedditTextField 
                            onChange={handleChange}
                            label="Alternate Phone Number"
                        />
                        <RedditTextField 
                            required
                            onChange={handleChange}
                            label="Email"
                        />

                        <Button 
                            type="submit" 
                            variant="outlined" 
                            onClick={handleClientAdd}>
                            Submit
                        </Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}
export default AddClientForm;