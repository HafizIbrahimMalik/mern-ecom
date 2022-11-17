import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useAuth } from '../../authentication/AuthProvider';
import { useNavigate } from "react-router-dom";
import { Fab, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Navbar from '../navbar/Navbar';
export default function Dashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <Stack width="50%" sx={{ mt: 20 }} margin="auto">
        <Button sx={{ width: "30%", p: 2, margin: "auto" }} color="secondary" variant="outlined" onClick={() => navigate('/product-categories')}>Product Category</Button>
        <Button sx={{ width: "30%", p: 2, margin: "auto" }} color="secondary" variant="outlined" onClick={() => navigate('/create-productCategories')}>Create Product Categories</Button>
        <Button sx={{ width: "30%", p: 1, mb: 2, margin: "auto" }} color="success" variant="text" onClick={() => navigate('/product')}> Product </Button>
        <Button sx={{ width: "30%", p: 1, mb: 2, margin: "auto" }} color="success" variant="text" onClick={() => navigate('/create-product')}>Create Product </Button>
        <Button sx={{ width: "30%", mt: 5, margin: "auto" }} variant="contained" onClick={logout}>logout</Button>
        <Fab
          color="success"
          sx={{
            position: 'absolute',
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2),
          }}
          onClick={() => navigate('/create-product')}>
          <Tooltip title="Create Product" placement="right-start">
            <AddIcon />
          </Tooltip>
        </Fab>
        <Fab
          color="secondary"
          sx={{
            position: 'absolute',
            bottom: (theme) => theme.spacing(12),
            right: (theme) => theme.spacing(2),
          }}
          onClick={() => navigate('/create-productCategories')}>
          <Tooltip title="Create Product Category" placement="right-start">
            <AddIcon />
          </Tooltip>
        </Fab>

      </Stack>
    </>
  );
}