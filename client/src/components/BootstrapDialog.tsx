import React from 'react';
import { DialogTitle, DialogActions, DialogContent, Dialog, IconButton, styled, Theme, useTheme,  } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';


export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  
  ' MuiDialog-container': {
    minHeight: '50vh',
    width: '65vw',
    margin: 'auto',
    marginBottom: '25px',
    },
  ' .MuiPaper-root': {
    // width: '50%',
    margin: 'auto',
  },
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
  
export const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;
    const theme: Theme = useTheme();
    return (
        <DialogTitle sx={{backgroundColor: '#001e90', color: '#ffff', m: 0, p: 2, fontSize: '25px'
      }} {...other}>
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

