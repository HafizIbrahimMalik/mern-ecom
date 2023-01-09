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
import { FormHelperText } from '@mui/material';
import apiUrl from '../../environment/enviroment'
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Stack, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
const schema = yup
  .object()
  .shape({
    id: yup.string(),
    name: yup.string().max(10).required(),
    shortName: yup.string().max(10).required(),
    description: yup.string().min(5).required(),
    productCategoryId: yup.string().required(),
    image: yup.mixed().required("required"),
  })
  .required();

const theme = createTheme();


export default function AdminCreateProduct() {
  const [imageFile, setImageFile] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const inputFileRef = useRef(null);
  const [apiResponse, setApiResponse] = useState(null);
  const navigate = useNavigate()
  let [searchParams,] = useSearchParams();
  const [productCategories, setProductCategories] = useState([])

  const {
    
    handleSubmit,
    setValue,
    control,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getProductList()
    if (searchParams.get('id')) {
      console.log(searchParams.get('id'));
      axios
        .get(`${apiUrl.baseUrl}/admin/products/${searchParams.get('id')}`)
        .then((response) => {
          console.log('asdf', response.data.data.productCategory._id)
          setSelectedImage(response.data.data.imagePath)
          setImageFile(response.data.data.imagePath)
          setValue("id", response.data.data._id);
          setValue("image", response.data.data.imagePath);
          setValue("name", response.data.data.name);
          setValue("shortName", response.data.data.shortName);
          setValue("description", response.data.data.description);
          setValue("productCategoryId", response.data.data.productCategory._id)
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
      .post(`${apiUrl.baseUrl}/admin/products`, fData)
      .then((response) => {
        setApiResponse(response.data);
        navigate('/admin/product')
      })
      .catch(function (error) {
        console.log(error);
        setApiResponse(error.response.data);
      });
  }

  function onSubmit(formData) {
    let fData = new FormData();
    fData.append("image", imageFile);
    fData.append("name", formData.name);
    fData.append("shortName", formData.shortName);
    fData.append("description", formData.description);
    fData.append("productCategoryId", formData.productCategoryId);
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
  function getProductList() {
    axios.get(`${apiUrl.baseUrl}/admin/productCategories`)
      .then((response) => {
        setProductCategories(response.data.data)
        console.log(response.data.data)

      })
      .catch(function (error) {
        console.log(error);
        setProductCategories(error.response.data)
      });
  }

  function editData(fData, id) {
    axios
      .put(`${apiUrl.baseUrl}/admin/products/${id}`, fData)
      .then((response) => {
        setApiResponse(response.data);
        navigate('/admin/product')
      })
      .catch(function (error) {
        console.log(error);
        setApiResponse(error.response.data);
      });
  }



  function handleImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      setImageFile(event.target.files[0]);
      setValue("image", event.target.files[0]);
      clearErrors('image')
    }
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
              {<b>{searchParams.get('id') ? 'Update' : 'Add'} Product</b>}
            </Typography>
            <input
              type="file"
              hidden
              ref={inputFileRef}
              onChange={handleImageChange} />
            <div style={{ maxWidth: 400, margin: "auto" }}>
              <img style={{ width: "100%" }} src={selectedImage} alt="" />
            </div>
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
                    id="filled-multiline-static"

                    render={({ field }) => (
                      <TextField
                        error={!errors.description?.type ? false : true}
                        helperText={errors.description?.message}
                        {...field}
                        fullWidth
                        label="Description"
                        multiline
                        rows={4}
                      />
                    )} />
                </Grid>
                {productCategories.length > 0 &&

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Product Category</InputLabel>
                      <Controller
                        control={control}
                        name="productCategoryId"
                        defaultValue={productCategories[0]._id}
                        render={({ field }) => (
                          <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Product Category"
                            error={!errors.productCategoryId?.type ? false : true}
                            {...field}
                          >

                            {productCategories && productCategories.map((item) => {
                              return <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                            })}
                          </Select>)} />
                      <FormHelperText error>{errors.productCategoryId?.message}</FormHelperText>
                    </FormControl>
                  </Grid>}
              </Grid>
              <Button
                fullWidth
                onClick={() => inputFileRef?.current.click()}
                sx={{ mt: 3, mb: 2 }}>
                Upload
                <PhotoCamera sx={{ ml: 5 }} color='primary' />
              </Button>

              <FormHelperText error>{errors.image?.message}</FormHelperText>
              <Button
                onClick={handleSubmit}
                type="submit"
                fullWidth
                variant="contained">
                {searchParams.get('id') ? 'Update' : 'Add'}
              </Button>
              <Stack>
                <Button type="button"
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => navigate('/admin/product')}>
                  Product
                </Button>
              </Stack>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}