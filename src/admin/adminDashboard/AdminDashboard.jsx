import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useAuth } from '../../authentication/AuthProvider';
import { useNavigate } from "react-router-dom";
import { Fab, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function AdminDashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  return (
    <>
      <AdminNavbar />
      <Stack sx={{ mt: 20, width: { width: "15%", lg: '25%', md: '50%', sm: '50%', xs: '95%' } }} margin="auto">
        <Button sx={{ p: 2 }} color="secondary" variant="outlined" onClick={() => navigate('/admin/product-categories')}><Typography width="100%"> Product Category</Typography></Button>
        <Button sx={{ p: 2 }} color="secondary" variant="outlined" onClick={() => navigate('/admin/create-productCategories')}><Typography width="100%">Create Product Categories</Typography></Button>
        <Button sx={{ p: 1, mb: 2 }} color="success" variant="text" onClick={() => navigate('/admin/product')}> Product </Button>
        <Button sx={{ p: 1, mb: 2 }} color="success" variant="text" onClick={() => navigate('/admin/create-product')}>Create Product </Button>
        <Button sx={{ mt: 5 }} variant="contained" onClick={logout}>logout</Button>
        <Fab
          color="success"
          sx={{
            position: 'absolute',
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2)
          }}
          onClick={() => navigate('/admin/create-product')}>
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
          onClick={() => navigate('/admin/create-productCategories')}>
          <Tooltip title="Create Product Category" placement="right-start">
            <AddIcon />
          </Tooltip>
        </Fab>

      </Stack>
    </>
  );
}