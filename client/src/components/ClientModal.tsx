import React, { useEffect, useState, useContext} from 'react';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { IClient } from '../../../interfaces/IClient';
import EditClientForm from './EditClientForm'
import { Modal } from '@mui/material';

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token") || "";
    if(config.headers){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});


//CONVERT TO MODAL
    //Move functions to parent? Client dashboard?
    

const Client: React.FC = () => {

    const [client, setClient] = useState<IClient | undefined>();
    const [editClient, setEditClient] = useState(false)
    const [editClientInput, setEditClientInput] = useState()
    const { clientId } = useParams();

    //useEffect
    useEffect(() => {
        console.log("Client page useEffect was called")
        getSingleClient()
    }, []);

    function handleChange(e: any){
        // const {name, value} = e.target
        // setEditClientInput(prevInputs => ({...prevInputs, [name]: value}))
        console.log("client handlechange was called")
      }

      //GET Single Client by Params
      function getSingleClient(){
          console.log("getSingleClient was called")
          console.log("clientId:", clientId)
          userAxios.get(`/api/client/${clientId}`)
            .then(res => {
                console.log(res.data)
                //@ts-ignore
                setClient(...res.data)
            })
            .then(() => console.log(client))
            .catch((err: any)=> console.log(err))
      }

      //Axios PUT function for edit client info
        //reset state to initInputs (this will either be all empty strings or the client's info) after PUT


    return (
        <>
        </>
        // <Modal
        
        // >
        //     {client && 
        //     <h1>{client.firstName} {client.lastName}</h1>
        //     }
        //     <br></br>
        //     {`Client ID: ${clientId}`}
        //     <button onClick={() => setEditClient(prev => !prev)}>
        //         {!editClient ? "Edit Client Info" : "cancel"}
        //     </button>
        //     {editClient && 
        //     <EditClientForm 
        //         handleChange={handleChange} 
        //         setEditClient={setEditClient}
        //     />}
        // </Modal>
    );
};

export default Client;
