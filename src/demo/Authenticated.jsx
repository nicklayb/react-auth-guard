import React from 'react'
import { withAuth } from '../lib'
import Hooked from './Hooked'
import { getFullname } from './utils'

const Authenticated = ({ auth }) => (
  <div>
    <h1>Authenticated</h1>
    <h3>{getFullname(auth.getUser())}</h3>
    <Hooked />
    <h5><button type="button" onClick={auth.logout}>Logout</button></h5>
  </div>
)

export default withAuth(Authenticated)
