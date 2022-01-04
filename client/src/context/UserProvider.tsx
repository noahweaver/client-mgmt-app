import React, { useState, FC } from 'react'
import axios from 'axios'
export const UserContext = React.createContext({})


export const UserProvider: FC = ({ children }) => {
    



    return (
        <UserContext.Provider 
            value={{

            }}>

            {children}
        </UserContext.Provider>
    )
}
