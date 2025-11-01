import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Input, Button } from '../components'
const UserLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const navigate = useNavigate()

  const submit = async (data) => {

    try {
      setIsLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`, data)
      if (response.status === 200) {
        const data = response.data
        localStorage.setItem('token', data?.data?.token)

        console.log(data.data.token);

        navigate('/')
      }

    } catch (error) {
      console.log('Error while Submitting form', error);
      setMessage(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

        <form onSubmit={handleSubmit(submit)}>
          {message && <p className="text flex justify-start-red-600 mt-8 text-center">{message}</p>}
          <h3 className='text-lg flex justify-start  font-medium mb-2'>What's your email</h3>

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
            type='submit' className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</Button>

        </form>
        <p className='text-center'>New here? <Link to='/userRegister' className='text-blue-600'>Create new Account</Link></p>
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


export default UserLogin
