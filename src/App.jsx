import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react'
import RegisterUser from './Pages/RegisterUser'
import LoginPage from './Pages/LoginPage'

import Navigation from './Component/Navigation'
import DashboardPage from './Pages/DashboardPage';
import Homepage from './Pages/Homepage';
import ChartPage from './Pages/ChartPage';
import Footer from './Component/Footer';
import ProtectedRoute from './Component/ProtectRoute';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <BrowserRouter>
        <Navigation />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/chart" element={
              <ProtectedRoute>
                <ChartPage />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
