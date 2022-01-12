import React, { useState, useEffect } from 'react'
import axios from 'axios'
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

    // add user invoices to state
    
    const initState = {
        // user: JSON.parse(localStorage.getItem("user") || "") || {},
        //@ts-ignore
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        errMsg: "",
        clients: []
    }

    const [userState, setUserState] = useState(initState)

    useEffect(() => {
       getUserClients() 
    }, [])

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
                // localStorage.setItem("userState", userState)
            })
            .catch(err => console.dir(err))
            // .catch(err => handleAuthErr(err.response.data.errMsg))
            // .catch(err => console.dir(err))
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
                // add to state update
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => console.dir(err))
            // .catch(err => handleAuthErr(err.response.data.errMsg))
    }
//logout
function logout(){
    console.log("UserProvider: logout was called")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("User Issues")
    setUserState({
        user: {},
        token: "",
        errMsg: "",
        clients: []
    })
}

    //GET USER ClIENTS
    function getUserClients(){
        console.log("getUserClients was called")
        userAxios.get("/api/client/user")
            .then(res => {
                const userClientList = res.data
                setUserState(prevState => ({
                    ...prevState,
                    clients: userClientList
                }))
            })
    }

    //GET USER INVOICES
    function getUserInvoices(){
        console.log("getUserInvoices was called")
        //userAxios.get
    }

    //ADD NEW CLIENT 
    function addNewClient(){
        console.log("Add New Client was called")
        //POST
        //Will need userID to be passed
    }
        
    

    return (
        <UserContext.Provider
            value ={{
                ...userState,
                setUserState,
                signup,
                login,
                logout,
                addNewClient
            }} >

            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => React.useContext(UserContext)