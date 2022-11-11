import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, Typography } from '@mui/material';
import { Button } from '@mui/material';
import axios from 'axios'
import apiUrl from '../../environment/enviroment'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from '../navbar/Navbar';

export default function ProductCategories() {
  const [apiResponse, setApiResponse] = useState(null)
  const [loadingData, setLoadingData] = useState(false)

  function getProductList() {
    setLoadingData(true)
    axios.get(`${apiUrl.baseUrl}/productCategories`)
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

  useEffect(() => { getProductList() }, []
  )
  const navigate = useNavigate()
  function deleteproductCategories(i) {
    axios.delete(`${apiUrl.baseUrl}/productCategories/${i}`)
      .then((response) => {
        setApiResponse(prevApiResponse => {
          let filteredData = prevApiResponse.data.filter(item => item._id !== i)

          return {
            ...prevApiResponse,
            data: [...filteredData]
          }
        })
      })
      .catch(function (error) {
        console.log(error);
        setApiResponse(error.response.data)
      });
  }
  function editproductCategories(i) {
    navigate({
      pathname: '/create-productCategories',
      search: `?id=${i}`
    })
  }

  return (
    <>
      <Navbar />
      <Stack sx={{ mt: 2 }}>
        <Button sx={{}} width="maxContent" onClick={() => navigate('/create-productCategories')}>Create Product Category</Button>
      </Stack>
      <TableContainer component={Paper} sx={{ width: "60%", margin: "auto", marginTop: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell >Name</TableCell>
              <TableCell >Short Name</TableCell>
              <TableCell >Descriptions</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              apiResponse?.data.map((r) => {
                return <TableRow key={r._id}>
                  <TableCell>
                    <Typography fontWeight="bold" component="h2">{r.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold" component="h2">{r.shortName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold" component="h2">{r.description}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Stack align="center" display="block" flexDirection="row">
                      <Button type="button" variant="text" onClick={() => { deleteproductCategories(r._id) }}>Delete</Button>
                      <Button type="button" variant="text" onClick={() => { editproductCategories(r._id) }}>Update</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              })}
            {!loadingData && !apiResponse?.data.length &&
              <TableRow>
                <TableCell sx={{ width: "50" }}>No  Data yet</TableCell>
              </TableRow>
            }
            {loadingData && !apiResponse?.data.length &&
              <TableRow>
                <TableCell>Data is being Loading</TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
