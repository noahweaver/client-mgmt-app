import React from 'react'
import { useNavigate } from 'react-router-dom'


interface NavProps {
    logout: () => void
}

const Nav: React.FC<NavProps> = ({ logout }) => {

    const navigate = useNavigate()

    return (
        <div>
            <button onClick={() => {
                    navigate('/home')
                    }}>Home</button>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Nav
