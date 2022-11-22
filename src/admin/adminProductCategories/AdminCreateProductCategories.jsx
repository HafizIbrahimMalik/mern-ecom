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
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Stack } from '@mui/material';
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

export default function AdminCreateProductCategories() {
  const [apiResponse, setApiResponse] = useState(null);
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
        .get(`${apiUrl.baseUrl}/admin/productCategories`, +searchParams.get('id'))
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
      .post(`${apiUrl.baseUrl}/admin/productCategories`, fData)
      .then((response) => {
        setApiResponse(response.data);
        navigate('/admin/product-categories')
      })
      .catch(function (error) {
        console.log(error);
        setApiResponse(error.response.data);
      });
  }

  function editData(fData, id) {
    axios
      .put(`${apiUrl.baseUrl}/admin/productCategories/${id}`, fData)
      .then((response) => {
        setApiResponse(response.data);
        navigate('/admin/product-categories')
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
            <Typography component="h1" variant="h5">
              {<b>{searchParams.get('id') ? 'Update' : 'Add'} Product Category</b>}
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
                        multiline
                        rows={4}
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
                {searchParams.get('id') ? 'Update' : 'Add'}
              </Button>
              <Stack>
                <Button type="button"
                  variant="outlined"
                  sx={{ mb: 2 }}
                  onClick={() => navigate('/admin/product-categories')}>
                  Product Categories
                </Button>
              </Stack>

            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}