import { Outlet, Navigate } from "react-router-dom"
export const ProtectedRoute=()=>{
return localStorage.getItem('accessToken')? <Outlet/>:<Navigate to="/"/>
}
