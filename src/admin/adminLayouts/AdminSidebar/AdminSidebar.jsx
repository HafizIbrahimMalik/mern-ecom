import { Drawer, Box, Typography, IconButton, Tooltip } from '@mui/material'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { Stack, Button, Avatar } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../authentication/AuthProvider';
import logo from "../../../../src/logo192.png"
export default function AdminSidebar() {
    const { logout } = useAuth()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const navigate = useNavigate()
    return (
        <div >
            <Tooltip title="menu">
                <IconButton
                    onClick={() => setIsDrawerOpen(true)}
                    size='large'
                    edge='start'
                    color='inherit'
                    aria-label='logo'>
                    <MenuIcon />
                </IconButton>
            </Tooltip>
            <Drawer
                anchor='left'
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}>
                <Box p={2} width='250px' role='presentation' textAlign='center' >
                    <div style={{ paddingLeft: "81px" }}>
                        <Avatar src={logo} sx={{ ml: "20px" }} /></div>
                    <Typography variant='bold' component='h1'>
                        TUTU
                    </Typography>
                    <Stack>
                        {window.location.href === "http://localhost:3000/create-productCategories" ? "" : <Button sx={{ mt: 5, fontSize: 14, fontWeight: 700 }} onClick={() => navigate('/admin/create-productCategories')}>Create Product Category</Button>}
                        {window.location.href === "http://localhost:3000/product-categories" ? "" : <Button sx={{ mt: 1 }} onClick={() => navigate('/admin/product-categories')}>Product Categories</Button>}
                        {window.location.href === "http://localhost:3000/create-product" ? "" : <Button sx={{ mt: 1 }} onClick={() => navigate('/admin/create-product')}>Create Product</Button>}
                        {window.location.href === "http://localhost:3000/product" ? "" : <Button sx={{ mt: 1 }} onClick={() => navigate('/admin/product')}>Product</Button>}
                        {window.location.href === "http://localhost:3000/Dashboard" ? "" : <Button sx={{ mt: 1 }} onClick={() => navigate('/admin/Dashboard')}>Dashboard</Button>}
                        <Button sx={{ mt: 1 }} onClick={logout}>logout</Button>
                    </Stack>
                </Box>
            </Drawer>
        </div>
    )
}