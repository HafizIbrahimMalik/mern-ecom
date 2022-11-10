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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { FormHelperText, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import apiUrl from '../../environment/enviroment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as moment from 'moment'
import { useAuth } from '../../authentication/AuthProvider';

const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required').min(5, 'Atleast 5 charcaters are requuired'),
    lastName: yup.string().required('Last Name is required').min(5, 'Atleast 5 charcaters are requuired'),
    email: yup.string().required().email(),
    password: yup.string().required().min(5),
    checkbox: yup.boolean("value should be boolean").oneOf([true], "Required terms of use").required("checkbox is required"),
    role: yup.string().required(),
    dob: yup.string().required()
}).required();
const theme = createTheme();
export default function SignUp() {
    const { login } = useAuth()
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        mode: "all",
        resolver: yupResolver(schema)
    });
    const [apiResponse, setApiResponse] = useState(null)
    function onSubmit(formData) {
        formData['dob'] = moment(formData['dob']).format('YYYY-MM-DD')
        axios.post(`${apiUrl.baseUrl}/user/signup`, {
            ...formData
        })
            .then((response) => {
                console.log('backend repsonse', response);
                setApiResponse(response.data)
                login(response.data.data)
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
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue='buyer'
                                        label="Role"
                                        error={!errors.role?.type ? false : true}
                                        {...register("role")}
                                    >
                                        <MenuItem value='admin'>Admin</MenuItem>
                                        <MenuItem value='seller'>Seller</MenuItem>
                                        <MenuItem value='buyer'>Buyer</MenuItem>
                                    </Select>
                                    <FormHelperText error>{errors.role?.message}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={control}
                                    name="dob"
                                    defaultValue=""
                                    render={({ field }) =>
                                        < LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                {...field}
                                                label="Date of birth"
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        error={!errors.dob?.type ? false : true}
                                                        helperText={errors.dob?.message}
                                                    />}
                                            />
                                        </LocalizationProvider>
                                    }
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