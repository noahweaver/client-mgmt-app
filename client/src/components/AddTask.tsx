import React, { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { TableCell, TextField, IconButton, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { ITask } from '../../../interfaces/ITask';
import { StyledTableCell, StyledTableRow } from './StyledTable';
import { RedditTextField } from './RedditTextField';


interface Props {
    setAddingTask: React.Dispatch<React.SetStateAction<boolean>>,
    addTask: (task: ITask) => void,
}

const AddTask: React.FC<Props> = (props) => {

    const initInputs = {
        title: "",
        materials: "",
        materialsCost: 0,
        price: 0,
        notes: "",
        completed: false
    }
    const [inputs, setInputs] = useState<ITask>(initInputs); 

    function handleChange(e: any){
        const {name, value} = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit() {
        console.log("submit task")
        //add task
    }

    function onCancel() {
        console.log("cancel adding task")
        props.setAddingTask(false);
    }

  return (
    <>
        <StyledTableCell style={{ width: '150px' }}>
            <TextField
                required
                autoFocus={false}
                name="title"
                fullWidth
                value={inputs?.title}
                label="Title"
                onChange={handleChange}
            />
        </StyledTableCell>
        <StyledTableCell>
            <TextField
                autoFocus={false}
                name="materials"
                fullWidth
                value={inputs?.materials}
                multiline
                rows={2}
                label="Materials"
                onChange={handleChange}
            />
        </StyledTableCell>
        <StyledTableCell style={{ width: '120px' }}>
            <TextField
                name="materialsCost"
                autoFocus={false}
                fullWidth
                value={inputs?.materialsCost}
                onChange={handleChange}
                label="Mats Cost"
            />
        </StyledTableCell>
        <StyledTableCell>
            <TextField
                name="notes"
                autoFocus={false}
                multiline
                rows={3}
                value={inputs?.notes}
                label="Notes" 
                onChange={handleChange}
            />
        </StyledTableCell>
        <StyledTableCell style={{ width: '150px' }}>
            <TextField
                name="price"
                autoFocus={false}
                value={inputs?.price}
                label="Price"
                onChange={handleChange}
            />
        </StyledTableCell>            
        <StyledTableCell style={{ width: '100px' }}>
            <IconButton size="small" onClick={() => handleSubmit()}>
                <CheckIcon />
            </IconButton>
            <IconButton size="small" onClick={() => { onCancel(); }}>
                <CancelIcon />
            </IconButton>
        </StyledTableCell>
    </>
  );
}

export default AddTask;