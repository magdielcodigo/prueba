import { Navigate } from "react-router-dom"

export const PrivateRoutes = ({children}) =>{
    const {log} = JSON.parse(localStorage.getItem('log')) || {log:false}
    return log ? children : <Navigate to="/" />
}