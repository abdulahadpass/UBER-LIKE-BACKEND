import React, { useContext, useEffect, useState } from 'react'
import { UserContextData } from '../context/createUserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectedRoute = ({ children }) => {
  const { setUser } = useContext(UserContextData)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log('token', token);

    if (!token) {
      navigate('/userLogin')
      return
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )

        setUser(res.data.data)
        setLoading(false)
      } catch (err) {
        console.error('Profile fetch failed:', err)
        localStorage.removeItem('token')
        navigate('/userLogin')
      }
    }

    fetchProfile()
  }, [navigate, setUser])

  if (loading) {
    return <p>Loading...</p>
  }

  return <>{children}</>
}

export default UserProtectedRoute
