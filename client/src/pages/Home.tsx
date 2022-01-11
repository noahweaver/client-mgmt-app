import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useUserContext } from '../context/UserProvider'

type homeUserState = {
    username: string,
    password: string
}

function Home() {

    const navigate = useNavigate()

    const { username, password } = useUserContext() as homeUserState

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
