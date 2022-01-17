import React from 'react'



const InvoiceDashboard: React.FC = () => {

    return (
        <div>
            <h1>Invoices List</h1>
            {/* Each Invoice will link to a page with the invoice info via Invoice.tsx */}
            {/* MUI has list components */}
            <p>Invoices listed from most recent. All will be linked to individual invoice. Will have the ability to search/filter by date or client name</p>
            {/* pagination MUI component to go through invoices */}
        </div>
    )
}

export default InvoiceDashboard
