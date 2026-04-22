import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ToastContainer} from 'react-toastify'
import "../src/stylesheets/index.css"
import App from './App.jsx'

createRoot(document.getElementById("root")).render(

   <>
    <App />
<ToastContainer positiom='top-right'autoClose={3000} className="my-toast"/>
    </>
)
