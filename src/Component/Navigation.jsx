import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import styles from "../stylesheets/navbar.module.css"


const Navigation = () => {

  // This controls whether the mobile menu is open or closed
  const [menuOpen, setMenuOpen] = useState(false)

  // Tracks whether a user is logged in (true when a token exists in storage)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  // Re-check the login status whenever the page (route) changes,
  // and also when another tab logs in or out (storage event).
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token")
      setIsLoggedIn(!!token)
    }

    checkLogin()
    window.addEventListener("storage", checkLogin)

    return () => {
      window.removeEventListener("storage", checkLogin)
    }
  }, [location])

  // Toggle the menu open / closed when hamburger is clicked
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  // Close the menu when a link is clicked (so it doesnt stay open)
  const closeMenu = () => {
    setMenuOpen(false)
  }

  // Log the user out: remove the token, update the navbar, go to login
  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    closeMenu()
    toast.success("Logged out successfully")
    navigate("/login")
  }

  // This function highlights the active link with a gold color
  const getActiveClass = ({ isActive }) => {
    return isActive ? styles.active : ''
  }


  return (
    <nav className={styles.navbar}>

      {/* Brand name on the left side */}
      <h3 className={styles.brand}>Trade. Track. Grow 🚀</h3>


      {/* Hamburger button — only shows on small screens (mobile)
          When clicked it opens/closes the nav menu
          It turns into an X when the menu is open */}
      <button
        className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>


      {/* Navigation links
          On desktop  → shown as a row
          On mobile   → hidden by default, slides down when menu is open */}
      <div className={`${styles.navlink} ${menuOpen ? styles.navOpen : ''}`}>

        <NavLink to="/"          onClick={closeMenu} className={getActiveClass}>Home</NavLink>

        {/* Register and Login are only shown when the user is logged OUT */}
        {!isLoggedIn && (
          <>
            <NavLink to="/register" onClick={closeMenu} className={getActiveClass}>Register</NavLink>
            <NavLink to="/login"    onClick={closeMenu} className={getActiveClass}>Login</NavLink>
          </>
        )}

        <NavLink to="/dashboard" onClick={closeMenu} className={getActiveClass}>Dashboard</NavLink>
        <NavLink to="/chart"     onClick={closeMenu} className={getActiveClass}>Chart</NavLink>

        {/* Logout is only shown when the user is logged IN */}
        {isLoggedIn && (
          <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        )}

      </div>

    </nav>
  )
}

export default Navigation
