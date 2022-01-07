import React from 'react'
import { IInput } from '../pages/Auth'

interface FormProps {
    btnText: string,
    inputs: IInput,
    errMsg?: string
    handleChange: (e: any) => void,
    handleSubmit: (e: any) => void,
}

const AuthForm: React.FC<FormProps> = ({
    btnText, 
    inputs: {
        username,
        password
    }, 
    errMsg, 
    handleChange, 
    handleSubmit
}) => {

    return (
        <div>
            <form onSubmit={handleSubmit}>
                
                <input
                    type="text"
                    value={username}
                    name="username"
                    onChange={handleChange}
                    placeholder="Username"
                >
                    <label>Username</label>    
                </input>
                <input 
                    type="text"
                    value={password}
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                >
                    <label>Password</label>
                </input>
                <button type="submit">{btnText}</button>
                <p>{errMsg}</p>
            </form>
        </div>
    )
}

export default AuthForm