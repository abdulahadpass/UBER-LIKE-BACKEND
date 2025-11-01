import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import {
  Button,
  Input
} from '../components'
const CaptainRegister = () => {

  const [error, setError] = useState('')

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const navigate = useNavigate()


  const submit = async (data) => {

    setError('')
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/captains/register`, data)
      console.log(res.data);
      navigate('/captainLogin')
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong!";
      setError(errMsg);
    }
  }


  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
         <div>
           <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
   
           <form onSubmit={handleSubmit(submit)}>
   
             <h3 className='text-lg w-full font-medium mb-2'>What's our Captain's name</h3>
             <div className='flex gap-4 mb-7'>
               <Input
                 required
                 className='bg-[#eeeeee] w-full rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                 type="text"
                 placeholder='First name'
                 {...register('fullName.firstName', { required: true })}
               />
               <Input
                 required
                 className='bg-[#eeeeee] w-full  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                 type="text"
                 placeholder='Last name'
                 {...register('fullName.lastName', { required: true })}
               />
             </div>
   
             <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
             <Input
               {...register('email', { required: true })}
               className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
               type="email"
               placeholder='email@example.com'
             />
   
             <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
   
             <Input
               className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
               {...register('password', { required: true })}
               required type="password"
               placeholder='password'
             />
   
             <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
             <div className='flex gap-4 mb-7'>
               <Input
                 className='bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                 type="text"
                 placeholder='Vehicle Color'
                 {...register('vehicle.color', { required: true })}
               />
               <Input
                 required
                 className='bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                 type="text"
                 placeholder='Vehicle Plate'
                 {...register('vehicle.plate', { required: true })}
               />
             </div>
             <div className='flex gap-4 mb-7'>
               <Input
   
                 className='bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                 type="number"
                 placeholder='Vehicle Capacity'
                 {...register('vehicle.capacity', { required: true })}
               />
               <Input
   
                 className='bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                 type="text"
                 placeholder='Vehicle Type'
                 {...register('vehicle.vehicleType', { required: true })}
               />
   
             </div>
   
             <button
               className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
             >Create Captain Account</button>
   
           </form>
           <p className='text-center'>Already have a account? <Link to='/captainLogin' className='text-blue-600'>Login here</Link></p>
         </div>
         <div>
           <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
             Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
         </div>
       </div>
  )
}

export default CaptainRegister