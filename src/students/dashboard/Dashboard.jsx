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
        <Button sx={{ width: "30%", p: 2, margin: "auto" }} variant="contained" onClick={() => navigate('/product-categories')}>Product Category</Button>
        <Button sx={{ width: "30%", p: 2, margin: "auto" }} color="secondary" variant="text" onClick={() => navigate('/create-productCategories')}>Create Product Categories</Button>
        <Button sx={{ width: "30%", mt: 5, margin: "auto" }} variant="outlined" onClick={logout}>logout</Button>
        <Fab
          color="secondary"
          sx={{
            position: 'absolute',
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2),
          }}
          onClick={() => navigate('/create-productCategories')}>
          <Tooltip title="Create Post" placement="right-start">
            <AddIcon />
          </Tooltip>
        </Fab>
      </Stack>
    </>
  );
}