import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
// import Auth from '../pages/Auth'


//unused props
    //redirectTo
    //...rest
    //component -> type: React.FC? 


interface RouteProps {
    path?: string, 
    token: string, 
    rest: any | undefined
}

const ProtectedRoute: React.FC<RouteProps> = ({ path,  token, rest }) => {
    

    return (
        <>
        {token ? 
            <Outlet {...rest}/> 
            :
             <Navigate to="/" />}

    </>
    )
}

export default ProtectedRoute

