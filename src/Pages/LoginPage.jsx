import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from "../stylesheets/auth.module.css"
import axios from 'axios';

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const API_Url = import.meta.env.VITE_API_URL;

    //handle Submit Button
    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            setLoading(true)
            const res = await axios.post(`${API_Url}/api/auth/login`, {
                email: email,
                password: password
            })
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard")
            toast.success("Logged in successfully")

        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid email or password");
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.badge}>👋</div>
                <h2 className={styles.title}>Welcome Back</h2>
                <p className={styles.subtitle}>
                    Sign in to your account to continue trading.
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label} htmlFor="email">Email address</label>
                    <input
                        id="email"
                        type="email"
                        className={styles.input}
                        value={email}
                        placeholder='you@example.com'
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />

                    <label className={styles.label} htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        className={styles.input}
                        value={password}
                        placeholder='Enter your password'
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />

                    <div className={styles.forgotLink}>
                        <Link className={styles.link} to="/forgot-password">Forgot Password?</Link>
                    </div>

                    <button className={styles.button} type='submit' disabled={loading}>
                        {loading ? "Signing in..." : "Login"}
                    </button>
                </form>

                <div className={styles.footerRow}>
                    Don't have an account? <Link className={styles.link} to="/register">Register</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
