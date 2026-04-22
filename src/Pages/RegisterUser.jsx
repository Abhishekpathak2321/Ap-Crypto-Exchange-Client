import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import styles from "../stylesheets/registerUser.module.css"

const RegisterUser = () => {

    //Api for creating users
    const API_Url = import.meta.env.VITE_API_URL
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    // handle click and submit function
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword)
            return toast.error("password does not match")

        try {
            setLoading(true)
            const res = await axios.post(`${API_Url}/api/auth/register`, {
                name: name,
                email: email,
                password: password,
            });
            console.log(res.data)
            navigate("/login")

        } catch (error) {
            toast.error(error.response?.data?.message || "Registration error ");

        }

        finally{
            setLoading(false)
        }
    }

    if (loading)
        return <h4>Loading...</h4>


    return (
        <div className={styles.container}>
         <div className={styles.formBox}>
            <h2>Create an account</h2>
            <form onSubmit={handleSubmit} className='box'>
                <input type="text"
                    value={name}
                    placeholder='Enter Your Name Here'
                    onChange={(event) => setName(event.target.value)}
                    required />
                <br /><br />

                <input type="email"
                    value={email}
                    placeholder='Enter Your Email Here'
                    onChange={(event) => setEmail(event.target.value)}
                    required />
                <br /> <br />

                <input type="password"
                    value={password}
                    placeholder='Enter Your Passwrod Here'
                    onChange={(event) => setPassword(event.target.value)}
                    required />
                <br /> <br />
                <input type="password"
                    value={confirmPassword}
                    placeholder='Confirm Password'
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required />
                <br /><br />
                <button  className={styles.btn} type='submit'>SignUp</button>

            </form>
            <p style={{color:"white"}}>{error}</p>
            <p className={styles.navi}>Already have an account? <Link className={styles.link} to = "/login">Login</Link></p>
            </div>
        </div>

    )
}

export default RegisterUser
