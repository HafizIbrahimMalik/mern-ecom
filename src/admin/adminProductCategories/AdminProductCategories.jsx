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
export default function AdminProductCategories() {
  const [apiResponse, setApiResponse] = useState(null)
  const [loadingData, setLoadingData] = useState(false)
  const navigate = useNavigate()

  function getProductList() {
    setLoadingData(true)
    axios.get(`${apiUrl.baseUrl}/admin/productCategories`)
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
  function deleteproductCategories(i) {
    axios.delete(`${apiUrl.baseUrl}/admin/productCategories/${i}`)
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
      pathname: '/admin/create-productCategories',
      search: `?id=${i}`
    })
  }

  return (
    <>
      <Stack sx={{ mt: 2 }}>
        <Button sx={{ width: "fit-content", marginLeft: "68%" }} onClick={() => navigate('/admin/create-productCategories')}>Create Product Category</Button>
      </Stack>
      <TableContainer component={Paper} sx={{ width: "60%", margin: "auto", marginTop: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="25%">Name</TableCell>
              <TableCell width="25%">Short Name</TableCell>
              <TableCell width="25%">Descriptions</TableCell>
              <TableCell width="25%" align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              apiResponse?.data.map((r) => {
                return <TableRow key={r._id}>
                  <TableCell width="25%">
                    <Typography fontWeight="bold" component="h2">{r.name}</Typography>
                  </TableCell >
                  <TableCell width="25%">
                    <Typography fontWeight="bold" component="h2">{r.shortName}</Typography>
                  </TableCell>
                  <TableCell width="25%">
                    <Typography fontWeight="bold" component="h2" sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: 'nowrap' }}>{r.description}</Typography>
                  </TableCell>
                  <TableCell width="25%" align="right">
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
