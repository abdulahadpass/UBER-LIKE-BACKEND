import express from 'express'
import { verifyUser } from '../middleware/auth.middleware.js'
import { createRide, getFare } from '../controllers/ride.controller.js'
const router = express.Router()

router.route('/createRide').post(verifyUser, createRide)
router.route('/getFare').get(verifyUser, getFare)
export default router