import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useUserContext } from '../context/UserProvider'

function Home() {

    const navigate = useNavigate()
    const { userState: {
        username,
        password
    } } = useUserContext()

    return (
        <div>
            <h1>Hello {username}</h1>
            <p>Your password is {password}</p>
            <button onClick={() => {
                navigate('/clientdashboard')
            }}>Client Dashboard</button>
        </div>
    )
}

export default Home
