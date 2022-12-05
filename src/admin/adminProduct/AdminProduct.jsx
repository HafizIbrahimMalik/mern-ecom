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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AdminProduct() {
  const [apiResponse, setApiResponse] = useState(null)
  const [loadingData, setLoadingData] = useState(false)
  const [slectedProduct, setSlectedProduct] = useState({})
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getProducts()
  }, []
  )
  function handleProduct(product) {
    setSlectedProduct(product)
    handleOpen()
  }

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

  function deletepost(i) {
    axios.delete(`${apiUrl.baseUrl}/admin/products/${i}`)
      .then((response) => {
        setApiResponse(prevApiResponse => {
          let filteredData = prevApiResponse.data.filter(item => item._id !== i)
          console.log("g", prevApiResponse.data)
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

  function editpost(i) {
    navigate({
      pathname: '/admin/create-product',
      search: `?id=${i}`
    })
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        width="60%" margin="auto"
        marginTop={3}
      >
        <Button sx={{ bgcolor: "#bbdefb" }} onClick={() => navigate('/admin/create-product')}>Create Product</Button>
      </Box>
      <TableContainer component={Paper} sx={{ width: "60%", margin: "auto", marginTop: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#bbdefb" }}>
              <TableCell width={"14%"}>Image</TableCell>
              <TableCell width={"14%"}>Name</TableCell>
              <TableCell width={"14%"}>Short Name</TableCell>
              <TableCell width={"14%"}>Description</TableCell>
              <TableCell width={"14%"} >Product Category Name</TableCell>
              <TableCell width={"14%"} align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              apiResponse?.data.map((r) => {
                return <TableRow sx={{ bgcolor: "#e3f2fd" }} key={r._id}>
                  <TableCell>
                    <div style={{ width: 200 }}>
                      <img onClick={handleProduct.bind(this, r)} style={{ width: "100%" }} src={r.imagePath} alt="img" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold" component="h2">{r.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold" component="h2">{r.shortName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: 'nowrap' }} fontWeight="bold" component="h2">{r.description}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold" component="h2">{r.productCategory ? r.productCategory.name : r.productCategory}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Stack flexDirection="row" display={"flex"} gap="2%">
                      <Button sx={{ bgcolor: "#ff867c", pl: "2px", width: "32%" }} type="button" variant="text" onClick={() => { deletepost(r._id) }}>Delete</Button>
                      <Button sx={{ bgcolor: "#bbdefb", pl: "2px", width: "32%" }} type="button" variant="text" onClick={() => { editpost(r._id) }}>Update</Button>
                      <Button sx={{ bgcolor: "#bbdefb", pl: "2px", width: "32%" }} onClick={handleProduct.bind(this, r)}>Details</Button>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", gap: "72px" }}>
            <div style={{ width: "500px" }}>
              <img style={{ width: "100%" }} src={slectedProduct?.imagePath} alt="img" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <Typography fontWeight="bold" component="h2">{slectedProduct?.name}</Typography>
              <Typography fontWeight="bold" component="h2">{slectedProduct?.shortName}</Typography>
              <Typography fontWeight="bold" sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "unset" }} component="h2">{slectedProduct?.description}</Typography>
              <Typography fontWeight="bold" component="h2">{slectedProduct?.productCategory?.name}</Typography>
            </div>
          </div>
          <Box
            m={1}
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Button sx={{ bgcolor: "#bbdefb" }} onClick={handleClose}>Close</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
