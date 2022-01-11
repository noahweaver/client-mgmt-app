import React from 'react'

interface NavProps {
    logout: () => void
}

const Nav: React.FC<NavProps> = ({logout}) => {
    return (
        <div>
            <h3>NAV BAR</h3>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Nav
