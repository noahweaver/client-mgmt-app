import React, { useState, useEffect } from 'react';
import { Container, IconButton, Table, TableBody, TableHead, TableRow, Typography } from '@mui/material';
import { IInvoice } from '../../../interfaces/IInvoice';
import { StyledTableCell, StyledTableRow } from '../components/StyledTable';
import { useUserContext } from '../context/UserProvider';
import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from 'react-router-dom';


type invoiceDashboardType = {
    invoices: Array<IInvoice>,
    // userState: {invoices: [IInvoice]}
}


const InvoiceDashboard: React.FC = () => {

    const { invoices } = useUserContext() as invoiceDashboardType;
    const [invoiceList, setInvoiceList] = useState<Array<IInvoice>>();
    const navigate = useNavigate();

    useEffect(() => {
        setInvoiceList(invoices)
    }, [invoices])


    return (
        <div>
            <Typography variant="h2" sx={{ m: '25px 0 0 25px'}}>Invoices</Typography>
            {/* Button to add invoice with client selection capability */}
            <p>Will have the ability to search/filter by date or client name</p>
            <Container disableGutters maxWidth="md" sx={{ padding: "2%", width: '95vw'}} >
                    <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Open</StyledTableCell>
                            <StyledTableCell align="left">Date Created</StyledTableCell>
                            <StyledTableCell align="left">Invoice Name</StyledTableCell>
                            <StyledTableCell align="left">Invoice Number</StyledTableCell>
                            <StyledTableCell align="left">Paid?</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoiceList && invoiceList.map((invoice: IInvoice) => 
                        //@ts-ignore
                        <StyledTableRow key={invoice._id} >
                            <StyledTableCell sx={!invoice.hasPaid ? {color: "red"} : null} >
                                <IconButton onClick={() => {
                                        //@ts-ignore
                                        navigate(`/invoices/${invoice?._id}`)
                                    }}>
                                    <LaunchIcon />
                                </IconButton>
                            </StyledTableCell>
                            <StyledTableCell sx={!invoice.hasPaid ? {color: "red"} : null} >{typeof invoice?.createdAt === "string" ? invoice.createdAt.split('T')[0] : "No date"}</StyledTableCell>
                            <StyledTableCell sx={!invoice.hasPaid ? {color: "red"} : null} >{invoice.invoiceName}</StyledTableCell>
                            {/* @ts-ignore */}
                            <StyledTableCell sx={!invoice.hasPaid ? {color: "red"} : null} >{invoice._id}</StyledTableCell>
                            <StyledTableCell sx={!invoice.hasPaid ? {color: "red"} : null} >{invoice.hasPaid ? "YES" : "NO"}</StyledTableCell>
                    </StyledTableRow>
                    )}
                    </TableBody>
                    </Table>
                </Container>
            {/* pagination MUI component to go through invoices */}
        </div>
    )
}

export default InvoiceDashboard;
