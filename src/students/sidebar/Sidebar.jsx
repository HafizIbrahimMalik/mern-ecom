import { Drawer, Box, Typography, IconButton } from '@mui/material'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { Stack, Button, Avatar } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../authentication/AuthProvider'
import a from "../../../src/logo192.png"
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


                <Box p={2} width='250px' role='presentation' textAlign='center' >
                    <div style={{paddingLeft: "85px"}}>
                        <Avatar src={a} sx={{ml:"20px" }} /></div>
                    <Typography variant='bold' component='h1'>
                        TUTU
                    </Typography>
                    <Stack>

                        <Button sx={{ mt: 5 , fontSize:12, fontWeight:700}} onClick={() => navigate('/create-productCategories')}>Create Product Category</Button>
                        <Button sx={{ mt: 1 }} onClick={() => navigate('/product-categories')}>Product Categories</Button>
                        <Button sx={{ mt: 1 }} onClick={() => navigate('/Dashboard')}>Dashboard</Button>
                        <Button sx={{ mt: 1 }} onClick={logout}>logout</Button>
                    </Stack>
                </Box>
            </Drawer>
        </div>
    )
}