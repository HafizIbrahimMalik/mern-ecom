import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Modal, Stack, Typography } from '@mui/material';
import { Button } from '@mui/material';
import axios from 'axios'
import apiUrl from '../../environment/enviroment'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
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
export default function AdminUser() {
  const [apiResponse, setApiResponse] = useState(null)
  const [loadingData, setLoadingData] = useState(false)
  const [slectedUser, setSlectedUser] = useState({})

  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function getUserList() {
    setLoadingData(true)
    axios.get(`${apiUrl.baseUrl}/admin/users`)
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

  useEffect(() => { getUserList() }, []
  )
  function deleteUser(i) {
    axios.delete(`${apiUrl.baseUrl}/admin/users/${i}`)
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
  function editUser(i) {
    navigate({
      pathname: '/admin/create-user',
      search: `?id=${i}`
    })
  }

  function handleUser(user) {
    setSlectedUser(user)
    handleOpen()
  }
  return (
    <>
      <Stack sx={{ mt: 2 }}>
        <Button sx={{ width: { sm: "fit-content", xs: "96%" }, pr: 6, marginLeft: { sm: "auto", xs: "auto" } }} onClick={() => navigate('/admin/create-user')}>Create User</Button>
      </Stack>
      <TableContainer component={Paper} sx={{ width: { width: "60%", xs: "96%" }, margin: "auto", marginTop: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "16%", p: 0, pl: 1, pt: 4, pb: 4 }}>First Name</TableCell>
              <TableCell sx={{ width: "16%", p: 0, pt: 4, pb: 4 }}>Last Name</TableCell>
              <TableCell sx={{ width: "16%", p: 0, pt: 4, pb: 4 }}>Email</TableCell>
              <TableCell sx={{ width: "16%", p: 0, pt: 4, pb: 4 }}>Role</TableCell>
              <TableCell sx={{ width: "16%" }} >Date of birth</TableCell>
              <TableCell sx={{ width: "17%" }} >Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              apiResponse?.data?.map((r) => {
                return <TableRow key={r._id}>
                  <TableCell sx={{ width: "16%", p: 0, pl: 1, pt: 4, pb: 2 }}>
                    <Typography fontWeight="bold" component="h2">{r[r.role]?.firstName}</Typography>
                  </TableCell >
                  <TableCell sx={{ width: "16%", p: 0, pl: 1, pt: 4, pb: 2 }}>
                    <Typography fontWeight="bold" component="h2">{r[r.role]?.lastName}</Typography>
                  </TableCell>
                  <TableCell sx={{ width: "16%", p: 0, pl: 1, pt: 4, pb: 2 }}>
                    <Typography fontWeight="bold" component="h2">{r.email}</Typography>
                  </TableCell>
                  <TableCell sx={{ width: "16%", p: 0, pl: 1, pt: 4, pb: 2 }}>
                    <Typography fontWeight="bold" component="h2">{r.role}</Typography>
                  </TableCell>
                  <TableCell sx={{ width: "16%", p: 0, pl: 1, pt: 4, pb: 2 }}>
                    <Typography fontWeight="bold" component="h2">{r[r.role]?.dob}</Typography>
                  </TableCell>
                  <TableCell sx={{ width: "17%", p: 0, pl: 1, pt: 4, pb: 2 }} align="right">
                    <Stack align="center" display="block" flexDirection="row">
                      <Button sx={{ bgcolor: "#ff867c" }} onClick={() => { deleteUser(r._id) }}>Delete</Button>
                      <Button sx={{ bgcolor: "#bbdefb" }} onClick={() => { editUser(r._id) }}>Update</Button>
                      <Button sx={{ bgcolor: "#bbdefb" }} onClick={handleUser.bind(this, r)}>Details</Button>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <Stack sx={{ display: "flex", gap: "72px" }}>
            <Stack sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <Typography fontWeight="bold" component="h2">{slectedUser?.firstName}</Typography>
              <Typography fontWeight="bold" component="h2">{slectedUser?.lastName}</Typography>
              <Typography fontWeight="bold" component="h2">{slectedUser?.email}</Typography>
              <Typography fontWeight="bold" component="h2">{slectedUser?.role}</Typography>
              <Typography fontWeight="bold" component="h2">{slectedUser?.dob}</Typography>
            </Stack>
          </Stack>
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
