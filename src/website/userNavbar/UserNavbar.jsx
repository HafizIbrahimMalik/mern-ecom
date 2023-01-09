import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useAuth } from '../../authentication/AuthProvider';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));



const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
export function UserNavbar() {
  const { logout } = useAuth()
  return (
    <Box>
      <AppBar component="nav">
        <Toolbar sx={{ display: 'flex', gap: 20 }} >
          <Typography
            variant="h6"
            sx={{ display: { xs: 'none', sm: 'block' } }}>
            TUTU
          </Typography>
          <Box display={"flex"} flexDirection="row">
            <Search>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Button sx={{ left: "auto", right: "16px", '&:hover': { backgroundColor: "skyblue", borderRadius: "1px" } }}><SearchOutlinedIcon sx={{ color: 'white' }} /></Button>
          </Box>
          <Button sx={{ color: '#fff' }}>
            Home
          </Button>
          <Button  sx={{color:"#fff"}} onClick={logout}>
            logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default UserNavbar