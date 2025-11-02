import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Button, Input } from '../components'
const CaptainLogin = () => {


  const navigate = useNavigate()

  const { register, handleSubmit } = useForm()

  const submit = async (data) => {
    console.log(data);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/captains/login`, data)
      console.log(response);
      
      if (response.status === 200) {
        const data = response.data
        localStorage.setItem('token', data?.data?.token)
        navigate('/')
      }


    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

        <form onSubmit={handleSubmit(submit)}>
          <h3 className='text-lg flex justify-start font-medium mb-2'>What's your email</h3>
          <Input
            type="email"
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            placeholder='email@example.com'
            {...register('email', {
              required: true,
              validate: {
                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Email must be Valid'
              }
            })}
          />

          <h3 className='text-lg flex justify-start font-medium mb-2'>Enter Password</h3>

          <Input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            {...register('password', { required: true })}
            placeholder='password'
          />

          <Button
          type='submit'
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</Button>

        </form>
        <p className='text-center'>Join a fleet? <Link to='/captainRegister' className='text-blue-600'>Register as a Captain</Link></p>
      </div>
      <div>
        <Link
          to='/userLogin'
          className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin