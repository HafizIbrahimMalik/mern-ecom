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
const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required').min(5, 'Atleast 5 charcaters are requuired'),
    lastName: yup.string().required('Last Name is required').min(5, 'Atleast 5 charcaters are requuired'),
    email: yup.string().required().email(),
    password: yup.string().min(5).required(),
    role: yup.string().required(),
    dob: yup.string().required()
}).required();
const theme = createTheme();
export default function AdminCreateUser() {
    const [apiResponse, setApiResponse] = useState(null)
    const navigate = useNavigate()
    const [, setUserData] = useState(null);
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
                    console.log(response.data.data[response.data.data.role]._id)
                    setUserData({ ...response.data })
                    setValue("firstName", response.data.data[response.data.data.role].firstName);
                    setValue("lastName", response.data.data[response.data.data.role].lastName);
                    setValue("role", response.data.data.role);
                    setValue("dob", response.data.data[response.data.data.role].dob);
                    setValue("email", response.data.data[response.data.data.role].email);
                    setValue("password", response.data.data[response.data.data.role].password);
                    setValue("id", response.data.data._id);
                })
                .catch(function (error) {
                    console.log(error);
                    setApiResponse(error.response.data);
                });
        }
    }, []
    )
    function addData(fData) {
        axios
            .post(`${apiUrl.baseUrl}/admin/users`, fData)
            .then((response) => {
                setApiResponse(response.data);
                navigate('/admin/users')
            })
            .catch(function (error) {
                console.log(error.response.data);
                setApiResponse(error.response.data);
            });
    }

    function onSubmit(formData) {
        let fData = new FormData();
        fData.append("firstName", formData.firstName);
        fData.append("lastName", formData.lastName);
        fData.append("role", formData.role);
        fData.append("dob", formData.dob);
        fData.append("email", formData.email);
        fData.append("password", formData.password);
        if (searchParams.get('id')) {
            editData(formData, searchParams.get('id'))
            // editData(fData, searchParams.get('id'))
        } else {
            addData(fData)
        }
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
                                    <Controller
                                        control={control}
                                        name="firstName"
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                error={!errors.firstName?.type ? false : true}
                                                helperText={errors.firstName?.message}
                                                {...field}
                                                fullWidth
                                                label="First Name"
                                            />
                                        )} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        control={control}
                                        name="lastName"
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                error={!errors.lastName?.type ? false : true}
                                                helperText={errors.lastName?.message}
                                                {...field}
                                                fullWidth
                                                label="Last Name"
                                            />
                                        )} />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                        <Controller
                                            control={control}
                                            name="role"
                                            defaultValue="Buyer"
                                            render={({ field }) => (
                                                <Select
                                                    fullWidth
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="role"
                                                    error={!errors.role?.type ? false : true}
                                                    {...field}
                                                >
                                                    <MenuItem value='admin'>Admin</MenuItem>
                                                    <MenuItem value='seller'>Seller</MenuItem>
                                                    <MenuItem value='buyer'>Buyer</MenuItem>
                                                </Select>)} />
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
                                {!searchParams.get('id') ? <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", gap: "13px" }}><Grid item xs={12} >
                                    <Controller
                                        control={control}
                                        name="email"
                                        defaultValue=""
                                        render={({ field }) => (
                                            <TextField
                                                error={!errors.email?.type ? false : true}
                                                helperText={errors.email?.message}
                                                {...field}
                                                fullWidth
                                                label="Email"
                                            />
                                        )} />
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
                                    </Grid></Grid> :

                                    <Grid item xs={12}>
                                        <Controller
                                            control={control}
                                            name="email"
                                            defaultValue=""
                                            render={({ field }) => (
                                                <TextField
                                                    error={!errors.email?.type ? false : true}
                                                    helperText={errors.email?.message}
                                                    {...field}
                                                    fullWidth
                                                    label="Email"
                                                    disabled
                                                />
                                            )} />
                                    </Grid>
                                }
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