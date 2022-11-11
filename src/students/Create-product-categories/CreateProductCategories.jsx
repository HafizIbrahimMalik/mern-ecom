import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import apiUrl from '../../environment/enviroment'
import axios from "axios";
import { useState,  useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Stack } from '@mui/material';
import Navbar from '../navbar/Navbar';
const schema = yup
  .object()
  .shape({
    id: yup.string(),
    name: yup.string().required(),
    shortName: yup.string().required(),
    description: yup.string().min(5).required(),
  })
  .required();

const theme = createTheme();


export default function CreateProductCategories() {
  const [, setApiResponse] = useState(null);
  const navigate = useNavigate()
  const [, setProductData] = useState(null);
  let [searchParams] = useSearchParams();
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (searchParams.get('id')) {
      axios
        .get(`${apiUrl.baseUrl}/productCategories`, +searchParams.get('id'))
        .then((response) => {
          console.log(response)
          setProductData({ ...response.data.data[0] })
          setValue("name", response.data.data[0].name);
          setValue("shortName", response.data.data[0].shortName);
          setValue("description", response.data.data[0].description);
          setValue("id", response.data.data[0]._id);
        })
        .catch(function (error) {
          console.log(error);
          setApiResponse(error.response.data);
        });
    }
  },
  )
  function onSubmit(formData) {
    let fData = new FormData();
    fData.append("id", formData.id);
    fData.append("name", formData.name);
    fData.append("shortName", formData.shortName);
    fData.append("description", formData.description);
    if (searchParams.get('id')) {
      if (typeof imageFile === 'string') {
        editData(formData, searchParams.get('id'))
      } else {
        editData(fData, searchParams.get('id'))
      }
    } else {
      addData(fData)
    }
  }
  function addData(fData) {
    axios
      .post(`${apiUrl.baseUrl}/productCategories`, fData)
      .then((response) => {
        setApiResponse(response.data);
        navigate('/productCategories')
      })
      .catch(function (error) {
        console.log(error);
        setApiResponse(error.response.data);
      });
  }

  function editData(fData, id) {
    axios
      .put(`${apiUrl.baseUrl}/productCategories/${id}`, fData)
      .then((response) => {
        setApiResponse(response.data);
        navigate('/productCategories')
      })
      .catch(function (error) {
        console.log(error); 
        setApiResponse(error.response.data);
      });
  }



  return (
    <>
      <Navbar />
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
            <Typography component="h1" variant="h5">
              <b>Add Product</b>
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="name"
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        error={!errors.name?.type ? false : true}
                        helperText={errors.name?.message}
                        {...field}
                        fullWidth
                        label="Name"
                      />
                    )}

                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="shortName"
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        error={!errors.shortName?.type ? false : true}
                        helperText={errors.shortName?.message}
                        {...field}
                        fullWidth
                        label="Short Name"
                      />
                    )} />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="description"
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        error={!errors.description?.type ? false : true}
                        helperText={errors.description?.message}
                        {...field}
                        fullWidth
                        label="Description"
                      />
                    )} />
                </Grid>
              </Grid>
              <Button
                onClick={handleSubmit}
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                variant="contained">
                Make ProductCategories
              </Button>
              <Stack>
                <Button type="button"
                  variant="outlined"
                  sx={{  mb: 2 }}
                  onClick={() => navigate('/product-categories')}>
                  Go to ProductCategories List
                </Button>
              </Stack>

            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}