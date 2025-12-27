import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from '../models/user.model.js'
import { getTimedDistance } from './map.controller.js'
import { Ride } from '../models/ride.model.js'

 const getFare=async(req,res)=> {
    const {pickup, destination} = req.query
    const distanceTime = await getTimedDistance(pickup, destination);
console.log('working');

    const baseFare = { auto: 30, car: 50, moto: 20 };
    const perKmRate = { auto: 10, car: 15, moto: 8 };
    const perMinuteRate = { auto: 2, car: 3, moto: 1.5 };

    const dist = Number(distanceTime.distanceInKm);
    const time = Number(distanceTime.distanceInMin);

    const fare = {
        auto: Math.round(baseFare.auto + dist * perKmRate.auto + time * perMinuteRate.auto),
        car: Math.round(baseFare.car + dist * perKmRate.car + time * perMinuteRate.car),
        moto: Math.round(baseFare.moto + dist * perKmRate.moto + time * perMinuteRate.moto)
    };

     return res.status(200).json(
    new ApiResponse(200, fare, "Fare calculated successfully")
  );
}


const createRide = asyncHandler(async (req, res) => {
    const { pickup, destination, vehicleType } = req.body

    if (!pickup || !destination || !vehicleType) {
        throw new ApiError(400, 'All Fields are required')
    }

    const findUser = await User.findById(req.user._id)
    if (!findUser) {
        throw new ApiError(404, 'User not found')
    }
console.log(findUser);

    // const calFare =  getFare(pickup,destination)

    const ride = await Ride.create({
        user: findUser._id,
        pickup: pickup,
        destination: destination,
        fare: 10,
        otp: Math.floor(1000 + Math.random() * 9000).toString()

    })
    return res.status(201).json(
        new ApiResponse(201, 'Ride created successfully', { ride })
    )
})
export {
    createRide,
    getFare
}