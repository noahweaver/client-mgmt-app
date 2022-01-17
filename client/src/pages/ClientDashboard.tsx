import React, { useState } from 'react';
import AddClientForm from '../components/AddClientForm';
import { useUserContext } from '../context/UserProvider';
import { IClient } from '../../../interfaces/IClient';
import { useNavigate } from 'react-router-dom'

type clientdashboardType = {
    clients: Array<IClient>
};

const ClientDashboard: React.FC = () => {

    const navigate = useNavigate()
    const [addingClientToggle, setAddingClientToggle] = useState<boolean>(false);
    const { clients } = useUserContext() as clientdashboardType;

    function handleChange(e: any){
        // const {name, value} = e.target
        // setEditClientInput(prevInputs => ({...prevInputs, [name]: value}))
        console.log("Clientdashboard handlechange was called")
      }

    return (
        <div>
            <h1>CLIENT DASHBOARD</h1>
            <div>
                <p>Client List</p>
                <ul>
                    {clients && clients.map(client => 
                    <li key={client._id}>
                        <div onClick={() => {
                            navigate(`/client/${client._id}`, { state: { client }})
                        }}>
                            <b>Client:</b> {client.firstName} {client.lastName}
                            <br></br>
                            Phone: {client.phone}
                            <br></br>
                            Address: {client.address}
                        </div>
                    </li>)}
                </ul>
                {/* pagination MUI component */}
            </div>
            {!addingClientToggle && <button onClick={() => setAddingClientToggle(prev => !prev)}>Add New Client</button>}
            {addingClientToggle && 
                <AddClientForm 
                    setAddingClientToggle={setAddingClientToggle}
                    handleChange={handleChange}
                />}
        </div>
    )
}

export default ClientDashboard
