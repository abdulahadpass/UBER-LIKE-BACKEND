import express, { Router } from 'express'
import { getCapttainProfile, loginCaptain, registerCaptain } from '../controllers/captain.controller.js'
import { verifyCaptain } from '../middleware/captain.middleware.js'

const router = Router()

router.route('/register').post(registerCaptain)
router.route('/login').post(loginCaptain)
router.route('/profile').get(verifyCaptain, getCapttainProfile)
export default router