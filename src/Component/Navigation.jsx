import React from 'react'
import {Link} from 'react-router-dom';
import styles from  "../stylesheets/navbar.module.css"



const Navigation = () => {
  return (
    <div className={styles.navbar}>
        <h3> Trade. Track. Grow 🚀</h3>

        <div className={styles.navlink} >
          <Link to = "/">Home</Link>
        <Link to = "/register">Register</Link>
        <Link to = "/login">Login</Link>
        <Link to = "/dashboard">Dashboard</Link>
        <Link to = "/chart">Chart</Link>
        </div>
      
    </div>
  )
}

export default Navigation
