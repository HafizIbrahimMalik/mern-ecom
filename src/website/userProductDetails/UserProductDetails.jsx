import * as React from 'react';
import { Button, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import apiUrl from '../../environment/enviroment';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';

export default function UserProductDetails() {
  const [apiResponse, setApiResponse] = useState("")

  let { id } = useParams();

  const {
  } = useForm({
  });

  useEffect(() => {
    axios
      .get(`${apiUrl.baseUrl}/admin/products/${id}`)
      .then((response) => {
        console.log("data", response.data)
        setApiResponse(response.data)
      })
      .catch(function (error) {
        console.log(error);
        setApiResponse(error.response.data);
      });
  }, []
  )

  return (
    <>
      <div style={{ width: "60%", width: "31%", margin: "auto", padding: "5px" }}>
        <Card sx={{ mt: 8 }}>
          <CardHeader
            sx={{color:"blue"}}
            title={apiResponse?.data?.name}
            subheader={apiResponse?.data?.shortName} />
          <CardMedia
            component="img"
            height="194"
            image={apiResponse?.data?.imagePath}
            alt="img" />
          <CardContent>
            <Typography variant="body2" color="text.secondary"> <b>Description : </b>
              {apiResponse?.data?.description}</Typography>
          </CardContent>
        </Card>
        <Button color='success'>Buy Now</Button>
      </div>
    </>
  );
}