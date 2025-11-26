import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopup'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'

const CaptainHome = () => {

    const [ridePopUp, setRidePopUp] = useState(true)
    const [confirmRidePopUp, setConfirmRidePopUp] = useState(false)
    const ridePopUpRef = useRef(null)
    const confirmRidePopUpRef = useRef(null)

    useGSAP(() => {
        if (ridePopUp) {
            gsap.to(ridePopUpRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopUpRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ridePopUp])
    useGSAP(() => {
        if (confirmRidePopUp) {
            gsap.to(confirmRidePopUpRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopUpRef.current, {
                transform: ' translateY(100%'
            })
        }
    }, [confirmRidePopUp])
    return (
        <div className='h-screen'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captainHome' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-3/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

            </div>
            <div className='h-2/5 p-6'>
                <CaptainDetails />
            </div>
            <div ref={ridePopUpRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <RidePopUp setRidePopUp={setRidePopUp} setConfirmRidePopUp={setConfirmRidePopUp} />
            </div>
            <div ref={confirmRidePopUpRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <ConfirmRidePopUp setConfirmRidePopUp={setConfirmRidePopUp} setRidePopUp={setRidePopUp} />
            </div>
        </div>
    )
}


export default CaptainHome
