import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRouteAdmin = ({ isAdmin, children }) => {
  if (!isAdmin) {
    alert('Tài khoản này không có quyền truy cập ')
    return <Navigate to="/" replace />
  }
  return children
}

export default ProtectedRouteAdmin
