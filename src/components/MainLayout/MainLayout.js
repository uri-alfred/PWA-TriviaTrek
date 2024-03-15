import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
    return (
        <div>
            {/* header o menú */}
            {/* <p>MainLayout menu</p> */}
            {/* contenido */}
            <Outlet />
        </div>
    )
}
