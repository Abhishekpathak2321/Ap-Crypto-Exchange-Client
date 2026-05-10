import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from "../stylesheets/registerUser.module.css"
import axios from 'axios';


const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const API_Url = import.meta.env.VITE_API_URL;
    console.log(API_Url)

    //handle Submit Button
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(email)

        try {
            setLoading(true)
            const res = await axios.post(`${API_Url}/api/auth/login`, {
                email: email,
                password: password
            })
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard")
          toast.success("Registration Successfully")

        } catch (error) {
            toast.error (error.response?.data?.message, "Invalid Email or Password");

        }
        finally {
            setLoading(false)
        }

    }

    if (loading)
        return <h4>loading....</h4>


    return (

        <div className={styles.container}>
            <div className={styles.formBox}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className='box'>

                    <input type="email"
                        value={email}
                        placeholder='Enter your Email'
                        onChange={(event) => setEmail(event.target.value)}
                        required />
                    <br /> <br />
                    <input type="password"
                        value={password}
                        placeholder='Enter your Password'
                        onChange={(event) => setPassword(event.target.value)}
                        required />
                    <br /> <br />
                    <button className={styles.btn} type='submit'>Login</button>
                </form>


                <p style={{ color: 'white' }}>{error}</p>
                <p className={styles.navi}>Don't have an account? <Link className={styles.link} to="/register">Register</Link></p>

            </div>

        </div>
    )
}

export default LoginPage
