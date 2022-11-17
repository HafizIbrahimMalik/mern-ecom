import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, Typography, Button } from '@mui/material';
import axios from 'axios'
import apiUrl from '../../environment/enviroment'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from '../layouts/navbar/Navbar';
export default function Product() {
  const [apiResponse, setApiResponse] = useState(null)
  const [loadingData, setLoadingData] = useState(false)
  function getProducts() {
    setLoadingData(true)
    axios.get(`${apiUrl.baseUrl}/admin/products`)
      .then((response) => {
        setApiResponse(response.data)
        setLoadingData(false)
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
        setApiResponse(error.response.data)
        setLoadingData(false)
      });
  }
 
  useEffect(() => {
    getProducts()
  }, []
  )

  const navigate = useNavigate()
  function deletepost(i) {
    axios.delete(`${apiUrl.baseUrl}/admin/products/${i}`)
      .then((response) => {
        setApiResponse(prevApiResponse => {
          let filteredData = prevApiResponse.products.filter(item => item._id !== i)
          return {
            ...prevApiResponse,
            products: [...filteredData]
          }
        })
      })
      .catch(function (error) {
        console.log(error);
        setApiResponse(error.response.data)
      });
  }
  function editpost(i) {
    navigate({
      pathname: '/create-product',
      search: `?id=${i}`
    })
  }

  return (
    <>
      <Navbar />
      <Stack sx={{ mt: 2 }}>
        <Button sx={{ width: "fit-content", marginLeft: "72%" }} onClick={() => navigate('/create-product')}>Create Product</Button>
      </Stack>
      <TableContainer component={Paper} sx={{ width: "60%", margin: "auto", marginTop: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell >Name</TableCell>
              <TableCell >Short Name</TableCell>
              <TableCell >Description</TableCell>
              <TableCell >Product Category Name</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              apiResponse?.data.map((r) => {
                return <TableRow key={r._id}>
                  <TableCell>
                    <div style={{ width: 200 }}>
                      <img style={{ width: "100%" }} src={r.imagePath} alt="img" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold" component="h2">{r.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold" component="h2">{r.shortName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold" component="h2">{r.description}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold" component="h2">{r.name}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Stack align="center" display="block" flexDirection="row">
                      <Button type="button" variant="text" onClick={() => { deletepost(r._id) }}>Delete</Button>
                      <Button type="button" variant="text" onClick={() => { editpost(r._id) }}>Update</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              })}
            {!loadingData && !apiResponse?.data.length &&
              <TableRow >
                <TableCell sx={{ width: "50" }}>No Post yet</TableCell>
              </TableRow>
            }
            {loadingData && !apiResponse?.data.length &&
              <TableRow align="center">
                <TableCell>Data is being Loading</TableCell>
              </TableRow>
            }
          </TableBody>


        </Table>
      </TableContainer>
    </>
  );
}
