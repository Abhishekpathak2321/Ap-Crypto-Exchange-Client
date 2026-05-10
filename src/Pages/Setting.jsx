import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../stylesheets/setting.css'

const Setting = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className='settingContainer'>
      <div className='settingBox'>
        <h2>Settings</h2>
        <div className='links'>
          <Link to="/">🏠 Home</Link>
          <Link to="/dashboard">📊 Dashboard</Link>
          <Link to="/chart">📈 Live Chart</Link>
          <Link to="/register">📝 Register</Link>
          <Link to="/login">🔑 Login</Link>
          <button className='logoutBtn' onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Setting;
