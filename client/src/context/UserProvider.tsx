import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IClient } from '../../../interfaces/IClient';
import { IInvoice } from '../../../interfaces/IInvoice';

const userAxios = axios.create()


const UserContext = React.createContext({})
// const UserContext = React.createContext<userProviderType>({} as userProviderType)

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token") || "";
    if(config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const UserProvider: React.FC = ({ children }) => {
    
    const initState = {
        //@ts-ignore
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        errMsg: "",
        clients: [],
        invoices: [],
        tasks: []
    }

    const [userState, setUserState] = useState(initState);
    const [authErr, setAuthErr] = useState(false);


    useEffect(() => {
       getUserClients()
       getOpenTasks() 
       getUserInvoices()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Signup
    function signup(credentials: any){
        axios.post("/authentication/signup", credentials)
            .then(res => {
                const {user, token} = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setUserState(prev => ({
                    ...prev,
                    user,
                    token
                }))
            })
            .catch(err => {
                setAuthErr(true)
                handleAuthErr(err.response.data.errMsg)
                console.dir(err)
            })
    }
    
    //Login
    function login(credentials: any){
        axios.post("/authentication/login", credentials)
            .then(res => {
                console.log(res)
                const {user, token} = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                getUserInvoices()
                getUserClients()
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => {
                console.dir(err)
                setAuthErr(true)
                handleAuthErr(err.response.data.errMsg)
            })
    };

    //Auth Errors
    function handleAuthErr(errMsg: string){
        console.log(`Authentication Error: ${errMsg}`);
        setAuthErr(true);
        setUserState(prev => ({
            ...prev,
            errMsg
        }))
    };

    //Reset Auth Errors
    function restAuthErr(){
        setAuthErr(false)
        setUserState(prev => ({
            ...prev,
            errMsg: ""
        }))
    }

    //Logout
    function logout(){
        console.log("UserProvider: logout was called")
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("User Issues")
        setUserState({
            user: {},
            token: "",
            errMsg: "",
            clients: [],
            tasks: [],
            invoices: []
        })
    }

    //GET USER ClIENTS
    function getUserClients(){
        console.log("getUserClients was called")
        userAxios.get("/api/client/user")
            .then(res => {
                const userClientList = res.data.sort(function(a: IClient, b: IClient){
                    if (a.lastName < b.lastName){
                        return -1;
                    }
                    if (a.lastName > b.lastName){
                        return 1;
                    }
                    return 0;
                })
                setUserState(prevState => ({
                    ...prevState,
                    clients: userClientList
                }))
            })
    }

    //GET USER INVOICES
    function getUserInvoices(){
        console.log("getUserInvoices was called")
        userAxios.get(`/api/invoice/user/${userState.user._id}`)
            .then(res => {
                const userInvoiceList = res.data.sort(function(a: IInvoice, b: IInvoice) {
                    if(typeof a.createdAt === "string" && typeof b.createdAt === "string"){
                        if (a?.createdAt < b?.createdAt){
                            return 1;
                        }
                        if (a?.createdAt > b?.createdAt){
                            return -1;
                        }
                }
                return 0;
                })
                //@ts-ignore
                setUserState(prevState => ({
                    ...prevState,
                    invoices: userInvoiceList
                }))
            })
            .catch(err => console.log(err))
    }


    //ADD NEW CLIENT 
    function addNewClient(newClient: any){
        console.log("Add New Client was called")
        userAxios.post('/api/client', newClient)
            .then(res => {
                //@ts-ignore
                setUserState(prevState => ({
                    ...prevState,
                    clients: [...prevState.clients, res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

     //DELETE client
     function deleteClient(client: any){
        console.log("delete client", client)
        userAxios.delete(`/api/client/${client?._id}`)
            .then(res => {
                getUserClients()
            })
            .catch((err) => console.log(err));
    }

     //UPDATE client
     function updateClient(updatedClient: any){
        console.log("update client", updatedClient)
        userAxios.put(`/api/client/${updatedClient?._id}`, updatedClient)
            .then(res => {
                getUserClients()
            })
            .catch((err) => console.log(err));
    }

    //GET all open tasks
    function getOpenTasks(){
        console.log("getOpenTasks was called")
    }
    

    return (
        <UserContext.Provider
            value ={{
                ...userState,
                setUserState,
                signup,
                login,
                logout,
                addNewClient,
                getOpenTasks,
                restAuthErr,
                deleteClient,
                updateClient,
                authErr, 
                getUserInvoices
            }} >

            {children}
        </UserContext.Provider>
    )
};

export const useUserContext = () => React.useContext(UserContext);