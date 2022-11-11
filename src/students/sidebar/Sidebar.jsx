import { Drawer, Box, Typography, IconButton } from '@mui/material'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { Stack } from '@mui/material'
import { Button } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../authentication/AuthProvider'
export default function Sidebar() {
    const { logout } = useAuth()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const navigate = useNavigate()
    return (
        <div >
            <IconButton
                onClick={() => setIsDrawerOpen(true)}
                size='large'
                edge='start'
                color='inherit'
                aria-label='logo'>
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor='left'
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}>
                <Box p={2} width='250px' role='presentation' textAlign='center'>
                    <Typography variant='bold' component='h1'>
                        APP
                    </Typography>
                    <Stack>
                        <Button sx={{ mt: 5 }} onClick={() => navigate('/create-post')}>Create Post</Button>
                        <Button sx={{ mt: 5 }} onClick={() => navigate('/posts')}>Post</Button>
                        <Button sx={{ mt: 5 }} onClick={() => navigate('/Dashboard')}>Dashboard</Button>
                        <Button sx={{ mt: 5 }} onClick={logout}>logout</Button>
                    </Stack>
                </Box>
            </Drawer>
        </div>
    )
}