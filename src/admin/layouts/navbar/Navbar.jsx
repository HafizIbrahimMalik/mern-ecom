import {
    AppBar, Toolbar, Button
} from '@mui/material'
import Sidebar from '../sidebar/Sidebar'
import { useAuth } from '../../../authentication/AuthProvider'
export default function Navbar() {
    const { logout } = useAuth()
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