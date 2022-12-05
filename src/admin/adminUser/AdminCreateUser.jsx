import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { FormHelperText, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
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
    role: yup.string().required(),
    dob: yup.string().required()
}).required();
const theme = createTheme();
export default function AdminCreateUser() {
    const { login } = useAuth()
    const [apiResponse, setApiResponse] = useState(null)
    const navigate = useNavigate()
    const [, setUserData] = useState(null);
    function onSubmit(formData) {
        formData['dob'] = moment(formData['dob']).format('YYYY-MM-DD')
        axios.post(`${apiUrl.baseUrl}/admin/users`, {
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
    function onSubmit(formData) {
        if (searchParams.get('id')) {
            editData(formData, searchParams.get('id'))
        } else {
            addData(formData)
        }
    }
    let [searchParams] = useSearchParams();
    const {
        handleSubmit,
        setValue,
        register,
        control,
        formState: { errors },
    } = useForm({
        mode: "all",
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (searchParams.get('id')) {
            axios
                .get(`${apiUrl.baseUrl}/admin/users/${searchParams.get('id')}`)
                .then((response) => {
                    console.log(response)
                    setUserData({ ...response.data.data })
                    setValue("FirstName", response.data.data.firstName);
                    setValue("LastName", response.data.data.lastName);
                    setValue("Role", response.data.data.role);
                    setValue("Date of Birth", response.data.data.dob);
                    setValue("Email", response.data.data.email);
                    setValue("id", response.data.data._id);
                })
                .catch(function (error) {
                    console.log(error);
                    setApiResponse(error.response.data);
                });
        }
    }, []
    )
    function onSubmit(formData) {
        if (searchParams.get('id')) {
            editData(formData, searchParams.get('id'))
        } else {
            addData(formData)
        }
    }

    function addData(fData) {
        axios
            .post(`${apiUrl.baseUrl}/admin/users`, fData)
            .then((response) => {
                setApiResponse(response.data);
                navigate('/admin/users')
            })
            .catch(function (error) {
                console.log(error);
                setApiResponse(error.response.data);
            });
    }

    function editData(fData, id) {
        axios
            .put(`${apiUrl.baseUrl}/admin/users/${id}`, fData)
            .then((response) => {
                setApiResponse(response.data);
                navigate('/admin/users')
            })
            .catch(function (error) {
                console.log(error);
                setApiResponse(error.response.data);
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
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
                        <Typography variant="h5">
                            {apiResponse &&
                                <div className={apiResponse?.success ? 'success' : 'error'}>
                                    {apiResponse?.message}
                                </div>
                            }
                        </Typography>
                        {<Typography variant="h5">{searchParams.get('id') ? 'Update' : 'Add'} User</Typography>}

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
                                <Grid item xs={6} sm={6}>
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
                                <Grid item xs={6} sm={6}>
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
                                                            className='dofFeild'
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
                            </Grid>
                            <Button
                                onClick={handleSubmit}
                                type="submit"
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                                variant="contained">
                                {searchParams.get('id') ? 'Update' : 'Add'}
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}