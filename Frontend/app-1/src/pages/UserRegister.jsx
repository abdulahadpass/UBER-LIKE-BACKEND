import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import {
  Button,
  Input
} from '../components'
const UserRegister = () => {

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
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/register`, data)
      console.log(res.data);
      navigate('/')
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong!";
      setError(errMsg);
    }
  }


  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

        <form onSubmit={handleSubmit(submit)}>
          {error && <p className="text flex justify-start-red-600 mt-8 text-center">{error}</p>}
          <h3 className='text-lg flex justify-start font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4'>
            <Input
              type="text"
              {...register('fullName.firstName', {
                required: true,
              })}
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              placeholder='FirstName'
            />
            <Input
              type="text"
              {...register('fullName.lastName', {
                required: true,
              })}
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              placeholder='LastName'
            />
          </div>
          <h3 className='text-lg flex justify-start  font-medium mb-2'>What's your Email</h3>
          <Input
            type="email"
            {...register('email', {
              required: true,
              validate: {
                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              }
            })}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            placeholder='email@example.com'
          />
          <h3 className='text-lg flex justify-start font-medium mb-2'>Enter Password</h3>
          <Input
            type="password"
            {...register('password', {
              required: true,
            })}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            placeholder='*********'
          />
          <Button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base' type='submit'
          >Register</Button>

        </form>
        <p className='text-center'>Do your have any <Link to='/userLogin' className='text-blue-600'>Account?</Link></p>
      </div>
      <div>
        <Link
          to='/captainLogin'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserRegister