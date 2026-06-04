import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from "../stylesheets/auth.module.css"
import axios from 'axios'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [resending, setResending] = useState(false)
    const [sent, setSent] = useState(false)

    const API_Url = import.meta.env.VITE_API_URL

    // Shared request used by both the first send and the "Resend" button.
    const sendResetLink = async () => {
        const res = await axios.post(`${API_Url}/api/auth/forgot-password`, { email })
        return res.data?.message
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setLoading(true)
            const message = await sendResetLink()
            toast.success(message || "Reset link sent. Please check your email.")
            setSent(true)
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleResend = async () => {
        try {
            setResending(true)
            await sendResetLink()
            toast.success("We've sent the reset link again. Please check your inbox.")
        } catch (error) {
            toast.error(error.response?.data?.message || "Could not resend right now. Try again shortly.")
        } finally {
            setResending(false)
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.badge}>{sent ? "📧" : "🔑"}</div>
                <h2 className={styles.title}>{sent ? "Check Your Email" : "Forgot Password?"}</h2>

                {sent ? (
                    <>
                        <p className={styles.subtitle}>
                            We've sent a secure password-reset link to <strong>{email}</strong>.
                        </p>
                        <p className={styles.notice}>
                            Click the link in that email to verify your identity and set a new password.
                            For your security, the link will expire in <strong>15 minutes</strong>.
                            If you don't see it, please check your spam or promotions folder.
                        </p>
                        <button
                            className={styles.buttonSecondary}
                            type="button"
                            onClick={handleResend}
                            disabled={resending}
                        >
                            {resending ? "Resending..." : "Resend Verification Email"}
                        </button>
                    </>
                ) : (
                    <>
                        <p className={styles.subtitle}>
                            Enter the email associated with your account. We'll send you a secure
                            verification link to reset your password safely.
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
                            <button className={styles.button} type='submit' disabled={loading}>
                                {loading ? "Sending..." : "Send Verification Link"}
                            </button>
                        </form>
                    </>
                )}

                <div className={styles.footerRow}>
                    Remembered it? <Link className={styles.link} to="/login">Back to Login</Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
