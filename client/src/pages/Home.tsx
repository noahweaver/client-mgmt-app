import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {

    const navigate = useNavigate()

    return (
        <div>
            <h1>Hello Username</h1>
            <button onClick={() => {
                navigate('/clientdashboard')
            }}>Client Dashboard</button>
        </div>
    )
}

export default Home
