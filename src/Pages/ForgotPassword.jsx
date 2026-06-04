import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from "../stylesheets/registerUser.module.css"
import axios from 'axios'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)

    const API_Url = import.meta.env.VITE_API_URL

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`${API_Url}/api/auth/forgot-password`, { email })
            toast.success(res.data?.message || "Reset link sent. Check your email.")
            setSent(true)
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong. Try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.formBox}>
                <h2>Forgot Password</h2>

                {sent ? (
                    <p style={{ color: 'white', lineHeight: 1.6 }}>
                        If that email is registered, we've sent a reset link.
                        Please check your inbox (and spam folder). The link expires in 15 minutes.
                    </p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginBottom: 16 }}>
                            Enter your account email and we'll send you a link to reset your password.
                        </p>
                        <input type="email"
                            value={email}
                            placeholder='Enter your Email'
                            onChange={(event) => setEmail(event.target.value)}
                            required />
                        <br /> <br />
                        <button className={styles.btn} type='submit' disabled={loading}>
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>
                )}

                <p className={styles.navi}>
                    Remembered it? <Link className={styles.link} to="/login">Back to Login</Link>
                </p>
            </div>
        </div>
    )
}

export default ForgotPassword
