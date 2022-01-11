import React, { useState } from 'react'
import axios from 'axios'
const userAxios = axios.create()

// type userStateType = {
//         user: any,
//         token: string,
//         errMsg: string
// }

// type userProviderType = {
//     userState: userStateType,
//     setUserState: React.Dispatch<React.SetStateAction<userStateType>>,
//     signup: (credentials: any) => void,
//     login: (credentials: any) => void,
// }

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
        // user: JSON.parse(localStorage.getItem("user") || "") || {},
        //@ts-ignore
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)

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
        errMsg: ""
    })
}
    return (
        <UserContext.Provider
            value ={{
                ...userState,
                setUserState,
                signup,
                login,
                logout
            }} >

            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => React.useContext(UserContext)