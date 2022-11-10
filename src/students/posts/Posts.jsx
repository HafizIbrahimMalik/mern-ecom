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
import Sidebar from "../sidebar/Sidebar"

export default function Posts() {
  const [apiResponse, setApiResponse] = useState(null)
  const [loadingData, setLoadingData] = useState(false)

  function getPosts() {
    setLoadingData(true)
    axios.get(`${apiUrl.baseUrl}/posts`)
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

  useEffect(() => { getPosts() }, []
  )
  const navigate = useNavigate()
  function deletepost(i) {
    axios.delete(`${apiUrl.baseUrl}/posts/${i}`)
      .then((response) => {
        setApiResponse(prevApiResponse => {
          let filteredData = prevApiResponse.posts.filter(item => item._id !== i)
          return {
            ...prevApiResponse,
            posts: [...filteredData]
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
      pathname: '/create-post',
      search: `?id=${i}`
    })
  }

  return (
    <>
      <Sidebar />
      <TableContainer component={Paper} sx={{ width: "60%", margin: "auto", marginTop: 10 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell >Title</TableCell>
              <TableCell >Content</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              apiResponse?.posts.map((r) => {
                return <TableRow key={r._id}>
                  <TableCell>
                    <div style={{width:200}}>
                      <img style={{width:"100%"}} src={r.imagePath} alt="img" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold" component="h2">{r.title}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold" component="h2">{r.content}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Stack align="center" display="block" flexDirection="row">
                      <Button type="button" variant="text" onClick={() => { deletepost(r._id) }}>Delete</Button>
                      <Button type="button" variant="text" onClick={() => { editpost(r._id) }}>Edit</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              })}
            {!loadingData && !apiResponse?.posts.length &&
              <TableRow >
                <TableCell sx={{ width: "50" }}>No Post yet</TableCell>
              </TableRow>
            }
            {loadingData && !apiResponse?.posts.length &&
              <TableRow align="center">
                <TableCell>Data is being Loading</TableCell>
              </TableRow>
            }
          </TableBody>


        </Table>
      </TableContainer>
      <Stack sx={{mt:6}}>
        <Button sx={{ width: 150,margin:"auto"  }}  onClick={() => navigate('/create-post')}>Create Post</Button>
      </Stack>
    </>
  );
}
