import React, { useState } from 'react'
import { CaptainContextData } from './createCaptainContext'

export const CaptainProvider = ({ children }) => {
    const [captain, setCaptain] = useState({
        email: '',
        fullName: {
            firstName: '',
            lastName: ''
        }
    })
    return (
        <CaptainContextData.Provider value={{ captain, setCaptain }}>
            {children}
        </CaptainContextData.Provider>
    )
}
