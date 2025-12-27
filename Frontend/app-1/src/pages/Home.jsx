import React, { useContext, useRef, useState } from 'react'
import { UserContextData } from '../context/createUserContext';
import { CaptainContextData } from '../context/createCaptainContext';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmVehicle';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import axios from 'axios'

export const Home = () => {

  const { user, name } = useContext(UserContextData)
  const { captain } = useContext(CaptainContextData)

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmVehicle, setConfirmVehicle] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [pickupSuggestion, setPickupSuggestion] = useState([])
  const [destinationSuggestion, setDestinationSuggestion] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)

  const panel = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmVehicleRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/map/getSuggestion`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

      setPickupSuggestion(response.data.message)


    } catch (error) {
      console.log(error);

    }
  }
  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/map/getSuggestion`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestion(response.data.message)
    } catch (error) {
      console.log(error);

    }
  }
  const getFareEstimate = async () => {
    setVehiclePanel(true)
    setPanelOpen(false)

    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/rides/getFare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    setFare(response.data.message)

  }

  const createRide = async () => {
    console.log('before');

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/rides/createRide`, {
        pickup,
        destination,
        vehicleType
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log('after');

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panel.current, {
        height: '70%',
        duration: '0.5',
        ease: "power2.out"
      })
    } else {
      gsap.to(panel.current, {
        height: '0%',
      })
    }
  }, [panelOpen])

  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])

  useGSAP(function () {
    if (confirmVehicle) {
      gsap.to(confirmVehicleRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmVehicleRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmVehicle])
  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])
  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])
  console.log('vehicleType', vehicleType);

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div className='h-screen w-screen'>
      </div>
      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 className='absolute right-6 top-6 text-2xl' onClick={() => setPanelOpen(false)}>
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form className='relative py-3' onSubmit={handleSubmit}>
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => { setPanelOpen(true); setActiveField('pickup') }}
              value={pickup}
              onChange={handlePickupChange}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
              type="text"
              placeholder='Add a pick-up location' />
            <input
              onClick={() => { setPanelOpen(true); setActiveField('destination') }}
              value={destination}
              onChange={handleDestinationChange}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
              type="text"
              placeholder='Enter your destination' />
          </form>
          <button
            onClick={getFareEstimate}
            className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
            Find Trip
          </button>
        </div>
        <div ref={panel} className='bg-white h-0'>
          <LocationSearchPanel
            suggestion={activeField === 'pickup' ? pickupSuggestion : destinationSuggestion}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setDestination={setDestination}
            setPickup={setPickup}
            activeField={activeField}
          />
        </div>
        <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
          <VehiclePanel
            setVehicleType={setVehicleType}
            fare={fare}
            setVehiclePanel={setVehiclePanel}
            setConfirmVehicle={setConfirmVehicle}

          />
        </div>
        <div ref={confirmVehicleRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
          <ConfirmRide
            createRide={createRide}
            setVehicleFound={setVehicleFound}
            setConfirmVehicle={setConfirmVehicle}
          />
        </div>
        <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
          <LookingForDriver createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            setVehicleFound={setVehicleFound} />
        </div>
        <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
          <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
        </div>
      </div>
    </div>
  )
}
