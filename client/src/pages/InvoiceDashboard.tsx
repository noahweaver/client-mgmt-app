import React from 'react'



const InvoiceDashboard: React.FC = () => {

    return (
        <div>
            <h1>Invoices List</h1>
            {/* Each Invoice will link to a page with the invoice info via Invoice.tsx */}
            <p>Invoices listed from most recent. All will be linked to individual invoice.</p>
        </div>
    )
}

export default InvoiceDashboard
