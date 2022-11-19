import {
    AppBar, Toolbar, Button
} from '@mui/material'
import AdminSidebar from '../AdminSidebar/AdminSidebar'
import { useAuth } from '../../../authentication/AuthProvider'
export default function AdminNavbar() {
    const { logout } = useAuth()
    return (
        <>
            <AppBar position='static' color='transparent'>
                <Toolbar >
                    <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                        <AdminSidebar />
                        <Button sx={{ mt: 1 }} onClick={logout}>logout</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}