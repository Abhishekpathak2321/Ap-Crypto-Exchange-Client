import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from "../stylesheets/navbar.module.css"


const Navigation = () => {

  // This controls whether the mobile menu is open or closed
  const [menuOpen, setMenuOpen] = useState(false)

  // Toggle the menu open / closed when hamburger is clicked
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  // Close the menu when a link is clicked (so it doesnt stay open)
  const closeMenu = () => {
    setMenuOpen(false)
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
        <NavLink to="/register"  onClick={closeMenu} className={getActiveClass}>Register</NavLink>
        <NavLink to="/login"     onClick={closeMenu} className={getActiveClass}>Login</NavLink>
        <NavLink to="/dashboard" onClick={closeMenu} className={getActiveClass}>Dashboard</NavLink>
        <NavLink to="/chart"     onClick={closeMenu} className={getActiveClass}>Chart</NavLink>
        <NavLink to="/setting"   onClick={closeMenu} className={getActiveClass}>Settings</NavLink>

      </div>

    </nav>
  )
}

export default Navigation
