import React from 'react'
import { withAuth } from '../lib'

const GOOD_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIn0.rTCH8cLoGxAm_xw68z-zXVKi9ie6xJn9tnVWjd_9ftE'
const BAD_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIn0.a7ktMGTybA32ykWHRvhp8FTEsBb-g3FN8aBB6FbgBo0'

const NotAuthenticated = ({ auth }) => {
  const login = () => auth.updateToken(GOOD_TOKEN)
  const badLogin = () => auth.updateToken(BAD_TOKEN)

  return (
    <div>
      <h1>NotAuthenticated</h1>
      <button type="button" onClick={login}>Login</button>
      <button type="button" onClick={badLogin}>Bad login</button>
    </div>
  )
}

export default withAuth(NotAuthenticated)
