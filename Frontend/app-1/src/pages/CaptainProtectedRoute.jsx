import React, { useContext, useEffect } from 'react'
import { CaptainContextData } from '../context/createCaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectedRoute = ({ children }) => {
    const { setCaptain } = useContext(CaptainContextData)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
console.log('token', token);

    // no token = not logged in
    if (!token) {
      navigate('/captainLogin')
      return
    }

    // fetch profile only once
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/captains/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )

        // Save user to context
        setCaptain(res.data.data)
      } catch (err) {
        console.error('Profile fetch failed:', err)
        localStorage.removeItem('token')
        navigate('/captainLogin')
      }
    }

    fetchProfile()
  }, [navigate, setCaptain])
    return (
        <div>
            {children}
        </div>
    )
}

export default CaptainProtectedRoute
