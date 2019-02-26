import React from 'react'
import { withAuth } from '../lib'

const FAKE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIn0.rTCH8cLoGxAm_xw68z-zXVKi9ie6xJn9tnVWjd_9ftE'

const NotAuthenticated = ({ auth }) => {
  const login = () => auth.updateToken(FAKE_TOKEN)

  return (
    <div>
      <h1>NotAuthenticated</h1>
      <button type="button" onClick={login}>Login</button>
    </div>
  )
}

export default withAuth(NotAuthenticated)
