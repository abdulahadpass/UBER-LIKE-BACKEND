import express from'express'
import { getUserProfile, loginUser, registerUser } from '../controllers/user.controller.js'
import { verifyUser } from '../middleware/auth.middleware.js'

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/profile').get(verifyUser, getUserProfile)
router.route('/logout').post(verifyUser, loginUser)
export default router


