import React from 'react'

interface IEditClientProps {
    setEditClient: React.Dispatch<React.SetStateAction<boolean>>,
    handleChange: (e: any) => void,
}

export const EditClientForm: React.FC<IEditClientProps> = ({ setEditClient, handleChange }) => {

    function handleEdit(e: any){
        e.preventDefault();
        setEditClient(prev => !prev);
        //submitEdit()
            //brought in as prop from client.tsx
    }

    return (
        <div>
            EDIT CLIENT FORM
            <p>this form still needs to be built out.</p>
            <form onSubmit={handleEdit}>
                <label>Name</label>
                <input type="text" onChange={handleChange}/>
                <label>Address</label>
                <input type="text" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditClientForm
