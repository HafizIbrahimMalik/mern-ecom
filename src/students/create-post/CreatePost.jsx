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
import { Stack } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import Navbar from '../navbar/Navbar';
const schema = yup
  .object()
  .shape({
    id: yup.string(),
    title: yup.string().required(),
    image: yup.mixed().required("required"),
    content: yup.string().min(5).required(),
  })
  .required();

const theme = createTheme();


export default function SignIn() {
  const [imageFile, setImageFile] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const inputFileRef = useRef(null);
  const [, setApiResponse] = useState(null);
  const navigate = useNavigate()
  const [, setPostData] = useState(null);
  let [searchParams] = useSearchParams();
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
    if (searchParams.get('id')) {
      axios
        .get(`${apiUrl.baseUrl}/posts`, +searchParams.get('id'))
        .then((response) => {
          console.log(response)
          setPostData({ ...response.data.posts[0] })
          setSelectedImage(response.data.posts[0].imagePath)
          setImageFile(response.data.posts[0].imagePath)
          setValue("image", response.data.posts[0].imagePath);
          setValue("title", response.data.posts[0].title);
          setValue("content", response.data.posts[0].content);
          setValue("id", response.data.posts[0]._id);
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
    fData.append("image", imageFile);
    fData.append("title", formData.title);
    fData.append("content", formData.content);
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
      .post(`${apiUrl.baseUrl}/posts`, fData)
      .then((response) => {
        setApiResponse(response.data);
        navigate('/posts')
      })
      .catch(function (error) {
        console.log(error);
        setApiResponse(error.response.data);
      });
  }

  function editData(fData, id) {
    axios
      .put(`${apiUrl.baseUrl}/posts/${id}`, fData)
      .then((response) => {
        setApiResponse(response.data);
        navigate('/posts')
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
              <b>ADD POST</b>
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
                  {/* <TextField
                  error={!errors.title?.type ? false : true}
                  helperText={errors.title?.message}
                  {...register("title")}
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                /> */}
                  <Controller
                    control={control}
                    name="title"
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        error={!errors.title?.type ? false : true}
                        helperText={errors.title?.message}
                        {...field}
                        fullWidth
                        label="Title"
                      />
                    )}

                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="content"
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        error={!errors.content?.type ? false : true}
                        helperText={errors.content?.message}
                        {...field}
                        fullWidth
                        label="content"
                      />
                    )} />
                </Grid>
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
                Post
              </Button>
              <Stack>
                <Button type="button"
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => navigate('/posts')}>
                  Go to Post
                </Button>
              </Stack>

            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}