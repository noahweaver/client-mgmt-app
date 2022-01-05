import React, { useState, FC } from 'react'
import axios from 'axios'
import { StringMappingType } from 'typescript'



type userProviderType = {
    userState: {
        username: string,
        password: string,
    }
    setUserState: React.Dispatch<React.SetStateAction<{
        username: string;
        password: string;
    }>>
    
}

const UserContext = React.createContext<userProviderType>({} as userProviderType)

export const UserProvider: FC = ({ children }) => {
    
    const initState = {
        username: "TEST USERNAME",
        password: "TEST PASSWORD",
    }

    // const initState = {
    //     user: JSON.parse(localStorage.getItem("user")) || {},
    //     token: localStorage.getItem("token") || "",
    //     issues: [],
    //     errMsg: ""
    // }

    const [userState, setUserState] = useState(initState)

    return (
        <UserContext.Provider 
            value={{
                userState,
                setUserState
            }}>

            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => React.useContext(UserContext)