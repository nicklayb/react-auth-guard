import React from 'react'
import { getFullname } from './utils'
import { useAuth } from '../lib'

const Hooked = () => {
  const auth = useAuth()

  return (
    <h2>
      This uses the hook:
      {getFullname(auth.getUser())}
    </h2>
  )
}

export default Hooked
