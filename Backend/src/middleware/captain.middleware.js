import { Captain } from "../models/captain.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken'
export const verifyCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
        if (!token) {
            throw new ApiError(401, 'UnAuthorized Access')
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!decodedToken) {
            throw new ApiError(401, 'UnAuthorized Access')
        }
        const captain = await Captain.findById(decodedToken?._id).select('-password')
        if (!captain) {
            throw new ApiError(401, 'UnAuthorized Access')
        }
        req.captain = captain
        next()
    } catch (error) {
        console.log('Captain verification Error', error);
    }
}