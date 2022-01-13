import React from 'react'
import { useUserContext } from '../context/UserProvider'


interface IClientFormProps {
    setAddingClientToggle: React.Dispatch<React.SetStateAction<boolean>>,
    handleChange: (e: any) => void;
}

type clientFormType ={
    addNewClient: () => void
}

const AddClientForm: React.FC<IClientFormProps> = ({ setAddingClientToggle, handleChange }) => {

    const { addNewClient } = useUserContext() as clientFormType

    function handleClientAdd(e: any){
        e.preventDefault()
        setAddingClientToggle(prev => !prev)
        addNewClient()
    }

    return (
        <div>
            <p>this form still needs to be built out.</p>
            <form onSubmit={handleClientAdd}>
                <label>Name</label>
                <input type="text" onChange={handleChange}/>
                <label>Address</label>
                <input type="text" onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddClientForm
