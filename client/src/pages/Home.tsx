import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useUserContext } from '../context/UserProvider'

type homeUserState = {
    user: {
        username: string
    }
}

function Home() {

    const navigate = useNavigate()

    const { user: { username } } = useUserContext() as homeUserState

    return (
        <div>
            <h1>Hello {username}!</h1>
            <div>
                <button onClick={() => {
                    navigate('/clientdashboard')
                    }}>Client Dashboard</button>
            </div>
            <div>
                <button onClick={() => {
                    navigate('/invoices')
                    }}>Invoices</button>
            </div>
            
        </div>
    )
}

export default Home
