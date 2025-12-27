import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import axios from 'axios'

const getAddressCoodinates = asyncHandler(async (req, res) => {
  const { address } = req.query;
  if (!address) {
    throw new ApiError(400, 'Address is required')
  }

  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    address
  )}&apiKey=${process.env.MAP_API}`;

  const response = await axios.get(url)
  const data = response.data
  console.log(data);
  if (!data || !data.features || data.features.length === 0) {
    throw new ApiError(404, 'Coordinates not found for the given address')
  }
  const coordinates = data.features[0].geometry.coordinates

  if (!coordinates) {
    throw new ApiError(404, 'Coordinates not found for the given address')
  }

  const formatted = {
    lat: coordinates[1],
    lng: coordinates[0],
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      formatted,
      'Coordinates Fetched successfully'
    )
  )
})
const getTimedDistance = async (start, end) => {
console.log('getTimedDistance called');
  if (!start || !end) {
    throw new ApiError(400, "Start and End coordinates are required");
  }
  console.log('Start', start);
  console.log('end', end);
  const startCode = await geocode(start)
  const endCode = await geocode(end)
  console.log('startCode', startCode);
  
  const waypoints = `${startCode.lat},${startCode.lng}|${endCode.lat},${endCode.lng}`;
  const url = `https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=drive&apiKey=${process.env.MAP_API}`;
  console.log('url',url);

  const response = await axios.get(url);

  const data = response.data;
  if (!data || !data.features || data.features.length === 0) {
    throw new ApiError(404, "Route not found for the given coordinates");
  }
  console.log(data.features[0].properties.waypoints[0]);

  const route = data.features[0].properties;

  if (!route) {
    throw new ApiError(404, "Route not found for the given coordinates");
  }
  const routeFormatted = {
    distanceInKm: (route.distance / 1000).toFixed(2),
    distanceInMin: (route.time / 60).toFixed(2),
  };

  return routeFormatted
};
const getSuggestion = asyncHandler(async (req, res) => {
  const { input } = req.query

  if (!input) {
    throw new ApiError(400, 'suggestion is Required')
  }
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
    input
  )}&limit=5&filter=countrycode:pk&apiKey=${process.env.MAP_API}`;

  const response = await axios.get(url)
  const data = response.data

  if (!data || !data.features || data.features.length === 0) {
    throw new ApiError(404, 'NoSuggestions Found')
  }
  const autoSuggestion = data.features.map((items) => ({
    formatted: items.properties.formatted,
    lat: items.properties.lat,
    lon: items.properties.lon
  }))

  return res.status(200).json(
    new ApiResponse(
      200,
      autoSuggestion,
      'Auto Suggestions Fetched Successfully'
    )
  )
})
const geocode = async (place) => {
  const res = await axios.get(
    "https://api.geoapify.com/v1/geocode/search",
    {
      params: {
        text: place,
        apiKey: process.env.MAP_API
      }
    }
  );

  if (!res.data.features.length) {
    throw new Error(`Invalid place: ${place}`);
  }

  return {
    lat: res.data.features[0].properties.lat,
    lng: res.data.features[0].properties.lon
  };
};


export {
  getAddressCoodinates,
  getTimedDistance,
  getSuggestion,
}