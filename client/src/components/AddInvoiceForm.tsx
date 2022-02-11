import React, { useState, useContext } from 'react';
import { StyledTableCell, StyledTableRow } from './StyledTable';
import { Box, Table, TableRow, TextField, TextFieldProps, Button, DialogTitle, Dialog, DialogContent, IconButton, styled, alpha, OutlinedInputProps, useMediaQuery, Checkbox, FormControlLabel, FormGroup, TableHead, TableBody } from '@mui/material';
import { useUserContext } from '../context/UserProvider';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme, Theme } from '@mui/material/styles';
import { IInvoice, IAddInvoiceForm } from '../../../interfaces/IInvoice';
import { ITask } from '../../../interfaces/ITask';
import { userInfo } from 'os';
import { RedditTextField } from './RedditTextField'; 
import { InvoiceContext } from '../context/InvoiceProvider';
import AddTask from './AddTask';


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
    
    const { user: { _id } } = useUserContext() as clientFormType;

    const initInputs = {
        invoiceName: "",
        tasks: [],
        hasPaid: false,
        feesAndTaxes: 0,
        totalPrice: 0, //add sum of all values here?
        notes: "",
        userId: _id,
        }

    const [addingTask, setAddingTask] = useState(false);
    const [newInvoice, setNewInvoice] = useState<IAddInvoiceForm>(initInputs);
    const [tasks, setTasks] = useState<Array<ITask>>(); // make constructor in ITask?
    const { addInvoice } = useContext(InvoiceContext) as invoiceFormType;
    const theme: Theme = useTheme();

    const DialogStyle = {
        dialogTitle: {
            backgroundColor: theme.palette.primary.main,
            color: '#ffff',
            marginBottom: '25px',
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

    function calculateTotalPrice(){
        //map tasks and add total together
    }

    function addTask(task: ITask){
        //receive task and add to state array
        console.log("add task")
    }

    function removeTask(task: ITask) {
        //remove task from state array
        console.log("remove task")
    }

    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    
    return (
        <Dialog
            open={addingInvoice}
            fullScreen={fullScreen}
        >
            <DialogTitle
                sx={ DialogStyle.dialogTitle }
            >New Invoice
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
                        gridTemplateColumns: { sm: 'repeat(4, 1fr)' },
                        gap: 2,
                      }}
                    noValidate
                    autoComplete="off"
                >
                    <RedditTextField 
                        sx={{ gridColumn: "1 / 5", marginTop: 2 }}
                        required
                        fullWidth
                        onChange={handleChange}
                        label="Invoice Name"
                        id="reddit-input"
                        name="invoiceName"
                        value={newInvoice.invoiceName}
                    />
                    <Table sx={{ gridColumn: "1 / 5"}}>
                        <TableHead>
                            <TableRow>
                            <StyledTableCell align="left">Title</StyledTableCell>
                            <StyledTableCell align="left">Materials</StyledTableCell>
                            <StyledTableCell align="left">Cost of materials</StyledTableCell>
                            <StyledTableCell align="left">Notes</StyledTableCell>
                            <StyledTableCell align="left">Price</StyledTableCell>
                            <StyledTableCell align="left">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {addingTask && 
                            <StyledTableRow>
                                <AddTask 
                                    setAddingTask={setAddingTask}
                                    addTask={addTask}
                                />
                            </StyledTableRow>
                            }
                            {tasks && tasks.map((task: ITask) => 
                            //@ts-ignore
                            <StyledTableRow key={task._id}>
                                <StyledTableCell>{task.title}</StyledTableCell>
                                <StyledTableCell>{task.materials ? task.materials : "No materials listed"}</StyledTableCell>
                                <StyledTableCell>{task.materialsCost ? task.materialsCost : 0}</StyledTableCell>
                                <StyledTableCell>{task.notes ? task.notes : "No Notes"}</StyledTableCell>
                                <StyledTableCell>{task.price}</StyledTableCell>
                                <StyledTableCell>
                                    <IconButton onClick={() => removeTask(task)}>
                                        {/* confirmation modal */}
                                        <DeleteIcon />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                            )}

                        </TableBody>
                    </Table>
                    <Button sx ={{ gridColumn: "1 / 2" }}variant="contained" color="primary" onClick={() => { setAddingTask(true); }}>
                        Add Task
                    </Button>

                    <RedditTextField 
                        onChange={handleChange}
                        label="Notes"
                        multiline
                        rows={4}
                        name="notes"
                        value={newInvoice.notes}
                        style={{ gridColumn: '1 / 3'}}
                    />
                    <RedditTextField 
                        required
                        name="feesAndTaxes"
                        label="Fees and Taxes"
                        fullWidth
                        autoFocus={false}
                        onChange={handleChange}
                        value={newInvoice.feesAndTaxes}
                        helperText="Taxes = 9% + fees"
                        style={{ gridColumn: "3 / 4"}}
                    />
                    <RedditTextField 
                        required
                        name="totalPrice"
                        label="Total Price"
                        fullWidth
                        autoFocus={false}
                        onChange={handleChange}
                        helperText="Sum of task prices + taxes + fees = Total Price" 
                        value={newInvoice.totalPrice}
                        style={{ gridColumn: "4 / 5"}}
                    />
                    <FormGroup>
                        <FormControlLabel 
                            control={<Checkbox 
                                defaultChecked={false}
                                //@ts-ignore
                                onChange={(e: any) => setNewInvoice((prevState: IInvoice) => ({...prevState, hasPaid: e.target.checked}))} 
                                value={newInvoice?.hasPaid} 
                            />} 
                            label="Has this invoice been paid yet?" />
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