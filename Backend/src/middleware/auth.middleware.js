import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken'

export const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
        if (!token) {
            throw new ApiError(401, 'Unauthorized Access')
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded._id).select('-password')
        req.user = user
        next()
    } catch (error) {
        console.log('Error while authentication User', error);

    }
}