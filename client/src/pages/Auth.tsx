import React, { useState } from 'react'
import AuthForm from '../components/AuthForm'
import { useUserContext } from '../context/UserProvider'

export interface IInput {
    username: string,
    password: string
}

type authUserState = {
    errMsg: string
    login: (credentials: any) => void,
    signup: (credentials: any) => void
}

const Auth: React.FC  = () => {

    const initInputs: IInput = { username: "", password: ""}

    const [inputs, setInputs] = useState<IInput>(initInputs)
    const [toggle, setToggle] = useState<boolean>(false)

    //going to add signup, login, and error message
    const { errMsg, login, signup } = useUserContext() as authUserState

    function handleChange(e: any){
        const {name, value} = e.target
        setInputs(prevInputs => ({
          ...prevInputs,
          [name]: value
        }))
      }
    
      function handleSignup(e: any){
        e.preventDefault()
        console.log("handleSignup was called")
        signup(inputs)
      }
    
      function handleLogin(e: any){
        e.preventDefault()
        console.log("handleLogin was called")
        login(inputs)
      }
    
      function toggleForm(){
        console.log("toggleForm was called")
        setToggle(prev => !prev)
        // resetAuthErr()
      }
        

    return (
        <div>
            <h1>Title for the client management home page</h1>

            {/* add errMsg to props */}
            
            {   !toggle ? 
                <>
                    <AuthForm 
                        btnText="Sign up"
                        handleChange={handleChange}
                        handleSubmit={handleSignup}
                        inputs={inputs}
                        errMsg={errMsg}
                    />
                    <button onClick={toggleForm}>Already a member?</button>
                </>
                :
                <>
                    <AuthForm 
                        btnText="Login"
                        handleChange={handleChange}
                        handleSubmit={handleLogin}
                        inputs={inputs}
                        errMsg={errMsg}
                    />
                    <button onClick={toggleForm}>Not a member?</button>
                </>
            }
         

        </div>
    )
}

export default Auth