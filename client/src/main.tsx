import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppEntry from './component/AppEntry'
import Login from './features/auth/login/view/Login'
import Dashboard from './features/home/dashboard/view/Dashboard'
import './css/index.css'
import ErrorElement from './component/ErrorElement'

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppEntry />,
        errorElement: <ErrorElement />
    },
    {
        path: '/auth/login',
        element: <Login />
    },
    {
        path: 'home/dashboard',
        element: <Dashboard />
    }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)
