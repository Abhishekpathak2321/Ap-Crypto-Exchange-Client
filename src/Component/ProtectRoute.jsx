import React from 'react'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectRoute = ({children}) => {
const token = localStorage.getItem("token");
if(!token){
    
    return <Navigate to = '/login' replace/>

}

return children 

}

export default ProtectRoute

