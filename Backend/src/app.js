import express from 'express'
import cors from 'cors'
import cookieparser from 'cookie-parser'
const app = express()

app.use(cors({ origin: process.env.CORS, credentials: true }))
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieparser())

// routes will be added here

import userRouter from './routes/user.routes.js'
import captainRouter from './routes/captain.routes.js'
import mapRouter from './routes/map.routes.js'
import rideRouter from './routes/ride.routes.js'

app.use('/api/v1/users', userRouter)
app.use('/api/v1/captains', captainRouter)
app.use('/api/v1/map', mapRouter)
app.use('/api/v1/rides', rideRouter)



export default app