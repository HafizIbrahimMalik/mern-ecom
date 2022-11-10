import {
    AppBar, Toolbar, Button, Stack, Menu, MenuItem
} from '@mui/material'
import { useState } from 'react'
import Sidebar from '../sidebar/Sidebar';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../authentication/AuthProvider'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const navigate = useNavigate()
    const { logout } = useAuth()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <AppBar position='static' color='transparent'>
            <Toolbar>
                <Sidebar />
                <Stack direction='row' spacing={2}>
                    <Button onClick={() => navigate('/create-post')}>Create Post</Button>
                    <Button onClick={() => navigate('/Dashboard')}>Dashboard</Button>
                    <Button id='resources-button'
                        aria-controls={open ? 'resources-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                        endIcon={<KeyboardArrowDownIcon />}
                        onClick={handleClick}>
                        Post
                    </Button>
                    <Button onClick={logout}>logout</Button>
                </Stack>
                <Menu
                    id='resources-menu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    MenuListProps={{
                        'aria-labelledby': 'resources-button'
                    }}>
                    <MenuItem onClick={() => navigate('/posts')}>Posts</MenuItem>
                    <MenuItem onClick={() => navigate('/Dashboard')}>Dashboard</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}