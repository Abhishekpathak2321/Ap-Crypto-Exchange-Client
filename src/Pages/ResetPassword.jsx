import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from "../stylesheets/registerUser.module.css"
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
        <div className={styles.container}>
            <div className={styles.formBox}>
                <h2>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <input type="password"
                        value={password}
                        placeholder='New Password'
                        onChange={(event) => setPassword(event.target.value)}
                        required />
                    <br /> <br />
                    <input type="password"
                        value={confirm}
                        placeholder='Confirm New Password'
                        onChange={(event) => setConfirm(event.target.value)}
                        required />
                    <br /> <br />
                    <button className={styles.btn} type='submit' disabled={loading}>
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>

                <p className={styles.navi}>
                    <Link className={styles.link} to="/login">Back to Login</Link>
                </p>
            </div>
        </div>
    )
}

export default ResetPassword
