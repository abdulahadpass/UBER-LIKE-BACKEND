import React, { useContext } from 'react'
import { UserContextData } from '../context/createUserContext';

export const Home = () => {
  const { user, name } = useContext(UserContextData)
  console.log('data', user, name);

  return (
    <div>Home</div>
  )
}
