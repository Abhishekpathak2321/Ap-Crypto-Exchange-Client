import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from "../stylesheets/auth.module.css"
import axios from 'axios'

const ResetPassword = () => {
    const { token } = useParams()
    const navigate = useNavigate()

    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [loading, setLoading] = useState(false)

    const API_Url = import.meta.env.VITE_API_URL

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters")
        }
        if (password !== confirm) {
            return toast.error("Passwords do not match")
        }

        try {
            setLoading(true)
            const res = await axios.post(`${API_Url}/api/auth/reset-password/${token}`, { password })
            toast.success(res.data?.message || "Password reset successfully")
            navigate("/login")
        } catch (error) {
            toast.error(error.response?.data?.message || "Reset link is invalid or expired")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.badge}>🔒</div>
                <h2 className={styles.title}>Reset Password</h2>
                <p className={styles.subtitle}>
                    Choose a new password for your account. Make it at least 6 characters.
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label} htmlFor="new-password">New password</label>
                    <input
                        id="new-password"
                        type="password"
                        className={styles.input}
                        value={password}
                        placeholder='Enter new password'
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />

                    <label className={styles.label} htmlFor="confirm-password">Confirm password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        className={styles.input}
                        value={confirm}
                        placeholder='Re-enter new password'
                        onChange={(event) => setConfirm(event.target.value)}
                        required
                    />

                    <button className={styles.button} type='submit' disabled={loading}>
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>

                <div className={styles.footerRow}>
                    <Link className={styles.link} to="/login">Back to Login</Link>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
