import React from 'react'
import { withAuth } from '../lib'

const getFullname = ({ firstName, lastName }) => [firstName, lastName].join(' ')

const Authenticated = ({ auth }) => (
  <div>
    <h1>Authenticated</h1>
    <h3>{getFullname(auth.getUser())}</h3>
    <h5><a href="#" onClick={auth.logout}>Logout</a></h5>
  </div>
)

export default withAuth(Authenticated)
