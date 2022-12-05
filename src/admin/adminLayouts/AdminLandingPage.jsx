import React from 'react'
import AdminNavbar from './adminNavbar/AdminNavbar'
import { Outlet } from 'react-router-dom'

export const AdminLandingPage = () => {
    return (
        <>
            <AdminNavbar />
            <Outlet />
        </>
    )
}
