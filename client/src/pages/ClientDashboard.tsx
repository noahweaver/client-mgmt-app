import React, { useState } from 'react';
import AddClientForm from '../components/AddClientForm';
import { useUserContext } from '../context/UserProvider';
import { IClient } from '../../../interfaces/IClient';

type clientdashboardType = {
    clients: Array<IClient>
};

const ClientDashboard: React.FC = () => {

    const [addingClientToggle, setAddingClientToggle] = useState<boolean>(false);
    const { clients } = useUserContext() as clientdashboardType;

    return (
        <div>
            <h1>CLIENT DASHBOARD</h1>
            <div>
                <p>Client List</p>
                <ul>
                    {clients && clients.map(client => 
                    <li key={client._id}>
                        <div>
                            <b>Client:</b> {client.firstName} {client.lastName}
                            <br></br>
                            Phone: {client.phone}
                            <br></br>
                            Address: {client.address}
                        </div>
                    </li>)}
                </ul>
            </div>
            {!addingClientToggle && <button onClick={() => setAddingClientToggle(prev => !prev)}>Add New Client</button>}
            {addingClientToggle && <AddClientForm setAddingClientToggle={setAddingClientToggle}/>}
        </div>
    )
}

export default ClientDashboard
