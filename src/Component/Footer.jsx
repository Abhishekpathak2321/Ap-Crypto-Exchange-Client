import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../stylesheets/footer.module.css'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>

        <div className={styles.brand}>
          <h3 className={styles.brandName}>⚡ AP Exchange</h3>
          <p className={styles.brandDesc}>
            Trade crypto with confidence. Real-time prices, secure authentication,
            and powerful live charting tools — all in one place.
          </p>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Navigate</h4>
          <Link className={styles.colLink} to="/">Home</Link>
          <Link className={styles.colLink} to="/dashboard">Dashboard</Link>
          <Link className={styles.colLink} to="/chart">Live Chart</Link>
          <Link className={styles.colLink} to="/setting">Settings</Link>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Account</h4>
          <Link className={styles.colLink} to="/register">Create Account</Link>
          <Link className={styles.colLink} to="/login">Login</Link>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Features</h4>
          <span className={styles.colText}>Real-time Prices</span>
          <span className={styles.colText}>Live TradingView Charts</span>
          <span className={styles.colText}>50+ Cryptocurrencies</span>
          <span className={styles.colText}>Secure JWT Auth</span>
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
