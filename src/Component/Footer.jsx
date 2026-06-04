import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from '../stylesheets/footer.module.css'

const Footer = () => {
  const year = new Date().getFullYear()
  const location = useLocation()

  // Track login status so we can hide the account links when signed in.
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Re-check on every route change, and when another tab logs in / out.
  useEffect(() => {
    const checkLogin = () => setIsLoggedIn(!!localStorage.getItem("token"))

    checkLogin()
    window.addEventListener("storage", checkLogin)

    return () => window.removeEventListener("storage", checkLogin)
  }, [location])

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>

        {/* Brand + short description */}
        <div className={styles.brand}>
          <h3 className={styles.brandName}>⚡ AP Exchange</h3>
          <p className={styles.brandDesc}>
            Trade crypto with confidence. Real-time prices, secure authentication,
            and powerful live charting tools — all in one place.
          </p>
        </div>

        {/* Link columns reflow neatly whether or not the Account column shows */}
        <div className={styles.linkColumns}>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Navigate</h4>
            <Link className={styles.colLink} to="/">Home</Link>
            <Link className={styles.colLink} to="/dashboard">Dashboard</Link>
            <Link className={styles.colLink} to="/chart">Live Chart</Link>
          </div>

          {/* Account links only make sense when logged out */}
          {!isLoggedIn && (
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Account</h4>
              <Link className={styles.colLink} to="/register">Create Account</Link>
              <Link className={styles.colLink} to="/login">Login</Link>
            </div>
          )}

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Features</h4>
            <span className={styles.colText}>Real-time Prices</span>
            <span className={styles.colText}>Live TradingView Charts</span>
            <span className={styles.colText}>50+ Cryptocurrencies</span>
            <span className={styles.colText}>Secure JWT Auth</span>
          </div>

        </div>

      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>© {year} AP Exchange. All rights reserved.</p>
        <p className={styles.disclaimer}>Prices shown for informational purposes only. Not financial advice.</p>
      </div>
    </footer>
  )
}

export default Footer
