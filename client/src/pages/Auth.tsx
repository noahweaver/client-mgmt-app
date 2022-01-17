import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useUserContext } from '../context/UserProvider';
import { Card, Button, Typography, Box } from '@mui/material';
import { useTheme, Theme } from '@mui/material/styles';

export interface IInput {
    username: string,
    password: string
}

type authUserState = {
    errMsg: string,
    authErr: boolean,
    login: (credentials: any) => void,
    signup: (credentials: any) => void,
    resetAuthErr: () => void
}

const Auth: React.FC  = () => {

    const initInputs: IInput = { username: "", password: ""};

    const [inputs, setInputs] = useState<IInput>(initInputs);
    const [toggle, setToggle] = useState<boolean>(false);
    const { errMsg, login, signup, resetAuthErr, authErr } = useUserContext() as authUserState;
    const theme: Theme = useTheme();

    const style = {
        container: {
            width: 400,
            height: 450,
            backgroundColor: theme.palette.primary.light,
            border: `${theme.palette.primary.main} 2px solid`,
            ...( errMsg && {
                border: `${theme.palette.error.main} 2px solid`
            }),
            borderRadius: theme.shape.borderRadius,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxShadow: 12
        }
    };


    function handleChange(e: any){
        const {name, value} = e.target
        setInputs(prevInputs => ({
          ...prevInputs,
          [name]: value
        }))
      };
    
      function handleSignup(e: any){
        e.preventDefault()
        console.log("handleSignup was called")
        signup(inputs)
      };

      function handleLogin(e: any){
        e.preventDefault()
        console.log("handleLogin was called")
        login(inputs)
      };
    
      function toggleForm(){
        console.log("toggleForm was called")
        setToggle(prev => !prev)
        // resetAuthErr()
      };
        

    return (
        <div style={{ height: "100%"}}>
            {/* add errMsg to props */}
            <Box sx={{
                display: "flex",
                justifyContent: "center",
            }}>
            <Typography variant="h3" sx={{ mt: "5%"}}>Client Weaver</Typography>
            </Box>
            <div style= {{ paddingTop: 75 }}>
                <Card 
                    sx={style.container}
                >
                
                { !toggle ? 
                <>
                    <AuthForm 
                        btnText="Log in"
                        handleChange={handleChange}
                        handleSubmit={handleLogin}
                        inputs={inputs}
                        errMsg={errMsg}
                        authErr={authErr}
                    />
                    <Button onClick={toggleForm} sx={{ paddingBottom: "15px" }}>Not a member?</Button>
                </>
                :
                <>
                    <AuthForm 
                        btnText="Sign up"
                        handleChange={handleChange}
                        handleSubmit={handleSignup}
                        inputs={inputs}
                        errMsg={errMsg}
                        authErr={authErr}
                    />
                    <Button onClick={toggleForm}>Already a member?</Button>
                </>
                }
            </Card>
            </div>
            
        </div>
    )
};

export default Auth;