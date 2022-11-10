import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { FormHelperText } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import apiUrl from '../../environment/enviroment';
import { useNavigate } from 'react-router-dom';
const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required').min(5, 'Atleast 5 charcaters are requuired'),
    lastName: yup.string().required('Last Name is required').min(5, 'Atleast 5 charcaters are requuired'),
    email: yup.string().required().email(),
    password: yup.string().required().min(5),
    checkbox: yup.boolean("valkye should be boolean").oneOf([true], "Required terms of use").required("checkbox i srequired")
}).required();
const theme = createTheme();
export default function SignUp() {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm({
        mode: "all",
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate()
    const [apiResponse, setApiResponse] = useState(null)
    function onSubmit(formData) {
        axios.post(`${apiUrl.baseUrl}/user/signup`, {
            ...formData
        })
            .then((response) => {
                console.log('backend repsonse', response);
                setApiResponse(response.data)
                navigate('/dashboard')
            })
            .catch(function (error) {
                console.log('Backend Not Responsed', error);
                setApiResponse(error.response.data)
            });
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {apiResponse &&
                            <div className={apiResponse?.success ? 'success' : 'error'}>
                                {apiResponse?.message}
                            </div>
                        }
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={!errors.firstName?.type ? false : true}
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    helperText={errors.firstName?.message}
                                    {...register("firstName")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={!errors.lastName?.type ? false : true}
                                    helperText={errors.lastName?.message}
                                    {...register("lastName")}
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"

                                />
                            </Grid>

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
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox
                                        error={!errors.checkbox?.type ? (false).toString() : (true).toString()}
                                        required
                                        color="primary"
                                        {...register("checkbox")} />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                                <FormHelperText error>{errors.checkbox?.message}</FormHelperText>
                            </Grid>
                        </Grid>
                        <Button

                            onClick={handleSubmit}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/sign-in" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}