import { Box, Grid, Paper, styled, Typography, Theme, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserProvider'

type homeUserState = {
    user: {
        username: string
    }
}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.h6,
    padding: theme.spacing(1),
    textAlign: 'center',
    wrap: 'nowrap',
    [theme.breakpoints.up('sm')]: {
        height: '250px',
        width: '75%',
    }
    }));


const Home: React.FC = () => {

    const navigate = useNavigate();
    const { user: { username } } = useUserContext() as homeUserState;
    const theme: Theme = useTheme();

    const style = {
        container: {        
            backgroundColor: theme.palette.primary.light,
            border: `${theme.palette.primary.main} 2px solid`,
            borderRadius: theme.shape.borderRadius,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxShadow: 12,
            color: theme.palette.primary.dark,
            cursor: "pointer",
        }
    };

    return (
        <Box sx={{ width: '85%', margin: 'auto' }}>
            <Typography variant="h3" sx={{ paddingTop: '35px'}} >Hello {username}!</Typography>
            {/* user card with: 
            user info, 
            letter avatar,
            avatar to edit user info,
            idk what else.  */}
            <Grid 
                container 
                sx={{ paddingTop: '15px', paddingBottom: '50px'}} 
                spacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Item sx={style.container} onClick={() => {
                    navigate('/clientdashboard')
                    }}> Client Dashboard </Item>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Item sx={style.container} onClick={() => {
                    navigate('/invoices')
                    }}> Invoices</Item>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Item sx={style.container} onClick={() => {
                    navigate('/tasks')
                    }}> Tasks (COMING SOON!) </Item>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Item sx={style.container}> Some other feature </Item>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home
