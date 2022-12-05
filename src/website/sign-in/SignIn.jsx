import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from 'react'
import axios from 'axios'
import apiUrl from '../../environment/enviroment'
import { useAuth } from '../../authentication/AuthProvider';
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(5),
}).required();

const theme = createTheme();


export default function SignIn() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [apiResponse, setApiResponse] = useState(null)
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "all",
        resolver: yupResolver(schema)
    });

    function onSubmit(formData) {
        axios.post(`${apiUrl.baseUrl}/user/login`, {
            ...formData
        })
            .then((response) => {
                login(response.data.data)
            })
            .catch(function (error) {
                setApiResponse(error.response?.data)
            });
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        {apiResponse &&
                            <div className={apiResponse?.success ? 'success' : 'error'}>
                                <h1>{apiResponse?.message}</h1>
                            </div>
                        }
                        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        error={!errors.email?.type ? false : true}
                                        helperText={errors.email?.message}
                                        {...register("email")}
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={!errors.password?.type ? false : true}
                                        helperText={errors.password?.message}
                                        {...register("password")}
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                onClick={onSubmit}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </Button>
                        </Box>
                    </Box><Typography component="p" disableUnderline sx={{ color: "blue", wl: 20, '&:hover': { color: "blue" }, color: "cornflowerblue", cursor: "pointer", width: "fit-content", ml: "auto" }} onClick={() => navigate('/sign-up')}>Sign Up</Typography>
                </Container>
            </ThemeProvider>
        </>
    );
}