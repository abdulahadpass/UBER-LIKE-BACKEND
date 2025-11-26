import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Captain } from "../models/captain.model.js";

const registerCaptain = asyncHandler(async (req, res) => {

    const { fullName, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await Captain.findOne({ email });

    if (isCaptainAlreadyExist) {
        throw new ApiError(400, 'Captain already exists')
    }



    const captain = await Captain.create({
        fullName: {
            firstName: fullName.firstName,
            lastName: fullName.lastName,
        },
        email,
        password,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        }
    });

    const token = captain.generateToken();

    res.status(201).json(
        new ApiResponse(201, 'Captain registered successfully', { token, captain })
    );get
})
const loginCaptain = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const captain = await Captain.findOne({ email })

    if (!captain) {
        throw new ApiError(401, 'Invalid Credentials')
    }

    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
        throw new ApiError(4001, 'Invalid Password')
    }

    const token = captain.generateToken();

    res.cookie('token', token);

    res.status(200).json(
        new ApiResponse(200, 'captain Logged in, successfully', { token, captain })
    );
})
const getCapttainProfile = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, 'Captain Profile Fetched Successfully', {captain : req.captain})
    )
})
export {
    registerCaptain,
    loginCaptain,
    getCapttainProfile
}