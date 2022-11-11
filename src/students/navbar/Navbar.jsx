import {
    AppBar, Toolbar, Button, Stack, Menu, MenuItem
} from '@mui/material'
import { useState } from 'react'
import Sidebar from '../sidebar/Sidebar';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../authentication/AuthProvider'
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
        <>

            <AppBar position='static' color='transparent'>
                <Toolbar >
                    <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                        <Sidebar />
                        <Button sx={{ mt: 1 }} onClick={logout}>logout</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}