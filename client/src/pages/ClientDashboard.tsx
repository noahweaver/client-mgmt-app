import React, { useState } from 'react'
import AddClientForm from '../components/AddClientForm'


const ClientDashboard: React.FC = () => {

    const [addingClientToggle, setAddingClientToggle] = useState<boolean>(false)

    return (
        <div>
            <h1>CLIENT DASHBOARD</h1>
            <div>
                <p>Client List</p>
            </div>
            {!addingClientToggle && <button onClick={() => setAddingClientToggle(prev => !prev)}>Add New Client</button>}
            {addingClientToggle && <AddClientForm setAddingClientToggle={setAddingClientToggle}/>}
        </div>
    )
}

export default ClientDashboard
