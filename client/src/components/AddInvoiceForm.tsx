import React, { useState, useContext, useEffect } from 'react';
import { StyledTableCell, StyledTableRow } from './StyledTable';
import { Box, Table, TableRow, TextField, TextFieldProps, Button, DialogTitle, Dialog, DialogContent, IconButton, styled, alpha, OutlinedInputProps, useMediaQuery, Checkbox, FormControlLabel, FormGroup, TableHead, TableBody } from '@mui/material';
import { useUserContext } from '../context/UserProvider';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme, Theme } from '@mui/material/styles';
import { IInvoice, IAddInvoiceForm } from '../../../interfaces/IInvoice';
import { ITask } from '../../../interfaces/ITask';
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
        totalPrice: 0,
        notes: "",
        userId: _id,
        }

    const [addingTask, setAddingTask] = useState(false);
    const [newInvoice, setNewInvoice] = useState<IAddInvoiceForm>(initInputs);
    const [tasksPrice, setTasksPrice] = useState(0)
    const [tasks, setTasks] = useState<Array<ITask>>([]); 
    const { addInvoice } = useContext(InvoiceContext) as invoiceFormType;
    const theme: Theme = useTheme();

    const DialogStyle = {
        dialogTitle: {
            backgroundColor: theme.palette.primary.main,
            color: '#ffff',
            marginBottom: '25px',
        },
        button: {
            // gridColumn: 'span 2',
            width: '50%',
            marginLeft: '25%',
            '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: '#ffff'
            }
        }
    }

    useEffect(() => {
        calculateTotalPrice();
    }, [tasksPrice, newInvoice.tasks, newInvoice.feesAndTaxes])

    function handleChange(e: any){
        const {name, value} = e.target;
        setNewInvoice(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    }

    function handlePriceChange(e: any){
        setNewInvoice(prevInputs => ({
            ...prevInputs,
            feesAndTaxes: parseInt(e.target.value)
        }));
    }

    function calculateTaskPrice(taskArr: ITask[]){
        let pricesSum = 0;
        for (let i = 0; i < taskArr.length; i++){
            //@ts-ignore
           pricesSum += parseInt(taskArr[i].price)
        }
        setTasksPrice(pricesSum);
    }

    function calculateTotalPrice(){      
        const ft = newInvoice.feesAndTaxes;
        const tp = tasksPrice;
        //@ts-ignore
        const total = parseInt(ft) + parseInt(tp)
        //@ts-ignore
        const ptp = parseInt(tp)
        if(ft){
            setNewInvoice(prevState => ({
            ...prevState, 
            totalPrice: total
        }))
        } else {
            setNewInvoice(prevState => ({
                ...prevState, 
                totalPrice: ptp
            }))
    
        }
        
    }

    function addTask(task: ITask){
        const taskArr = newInvoice.tasks.concat(task);
        setNewInvoice(prevState => ({
            ...prevState,
            tasks: taskArr
        }));
        calculateTaskPrice(taskArr);
        setAddingTask(false);
    }

    //STILL NEED TO TEST THIS
    function removeTask(task: ITask) {
        //remove task from state array
        const newTaskArr = tasks?.filter(t => t.title !== task.title);
        setTasks(newTaskArr);
        calculateTaskPrice(newTaskArr);
    }

    function handleInvoiceAdd(e: any){
        e.preventDefault();
        //make sure the total and price are both added to the newInvoice state
        setAddingInvoiceToggle(false);
        //FROM CONTEXT?
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
                            {newInvoice.tasks && newInvoice.tasks.map((task: ITask) => 
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
                        style={{ gridColumn: '1 / 5'}}
                    />
                    <RedditTextField 
                        required
                        name="feesAndTaxes"
                        label="Fees and Taxes"
                        fullWidth
                        autoFocus={false}
                        onChange={handlePriceChange}
                        value={newInvoice.feesAndTaxes}
                        style={{ gridColumn: "1 / 2"}}
                    />
                    <RedditTextField 
                        name="totalPrice"
                        label="Total Price"
                        disabled
                        fullWidth
                        autoFocus={false}
                        value={newInvoice.totalPrice}
                        style={{ gridColumn: "1 / 2"}}
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
                    <Box sx={{ gridColumn: "1 / 5"}}>
                        <Button 
                            type="submit" 
                            variant="outlined" 
                            onClick={handleInvoiceAdd}
                            sx={DialogStyle.button}
                            >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
export default AddInvoiceForm;