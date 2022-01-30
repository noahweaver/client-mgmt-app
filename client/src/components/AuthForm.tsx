import React from 'react';
import { IInput } from '../pages/Auth';
import { Box, Button, Typography, InputLabel, TextField, useMediaQuery, Theme, useTheme } from '@mui/material';
interface FormProps {
    btnText: string,
    inputs: IInput,
    errMsg?: string,
    authErr: boolean,
    handleChange: (e: any) => void,
    handleSubmit: (e: any) => void
};

const AuthForm: React.FC<FormProps> = ({
    btnText, 
    inputs: {
        username,
        password
    }, 
    errMsg, 
    handleChange, 
    handleSubmit,
    authErr
}) => {

    const theme: Theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));


    return (
        <Box
            component="form"
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                mx: "auto",
                height: "100%",
                width: "75%"
            }}
            
        >
            <Typography variant="h4" sx={{ alignSelf: 'center', paddingTop: "15px", paddingBottom: "5px" }}>{ btnText }</Typography>
            <Typography sx={{ textDecoration: "bold" }}>Username: </Typography>
            <TextField
                value={username}
                name="username"
                onChange={handleChange}
                label="Username"
                required
                id="outlined-username"
                error={authErr}
            />
            <Typography sx={{ textDecoration: "bold" }}>Password: </Typography>
            <TextField 
                type="password"
                value={password}
                name="password"
                onChange={handleChange}
                label="Password"
                id="outlined-Password"
                variant="outlined"
                required
                error={authErr}
            />
            <Typography variant="body1" sx={{ height: "5px", color: "red", textDecoration: "bold" }}>{errMsg}</Typography>
            <Button type="submit" onClick={handleSubmit} variant="contained" sx={{ marginTop: "15px" }}>{btnText}</Button>
        </Box>
    )
};

export default AuthForm;