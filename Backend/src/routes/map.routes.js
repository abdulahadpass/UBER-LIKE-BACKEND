import express from 'express'
import { verifyUser } from '../middleware/auth.middleware.js'
import { getAddressCoodinates, getSuggestion, getTimedDistance } from '../controllers/map.controller.js'

const router = express.Router()

router.route('/getCoordinates').get(verifyUser, getAddressCoodinates)
router.route('/getTimedDistance').get(verifyUser, getTimedDistance)
router.route('/getSuggestion').get(verifyUser, getSuggestion)

export default router