import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body
    console.log(fullName, email, password);

    if ([fullName, email, password].some((field) => field === '')) {
        throw new ApiError(400, 'All fields are required')
    }

    const existedUser = await User.findOne({ email })
    if (existedUser) {
        throw new ApiError(400, 'User already exists')
    }
    const createUser = await User.create({
        fullName: {
            firstName: fullName.firstName,
            lastName: fullName.lastName
        },
        email,
        password
    })
    if (!createUser) {
        throw new ApiError(500, 'Failed to create user')
    }
    const user = await User.findById(createUser._id).select('-password')
    return res.status(201).json(
        new ApiResponse(201, 'User registered successfully', user)
    )
})
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        throw new ApiError(401, 'Invalid email or password')
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new ApiError(401, 'Invalid Password')
    }

    const token = user.generateToken();

    res.cookie('token', token);

    res.status(200).json(
        new ApiResponse(200, 'User LoggedinSuccessfully', { token, user })
    );
})
const getUserProfile = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, 'User profile fetched successfully', req.user)
    )
})
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('token');
    res.status(200).json(
        new ApiResponse(200, 'User logged out successfully', {})
    );
})

export {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
}