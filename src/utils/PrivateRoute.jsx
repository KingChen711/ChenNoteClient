import React from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { LOCAL_STORAGE_TOKEN_NAME } from '../contexts/constants'

export default function PrivateRoute() {
  let token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
  return (
    !token || token === "no-token" ? <Navigate to="/auth" /> : <Outlet />
  )
}