import React from 'react'
import { Consumer } from './AuthenticationProvider'

const withAuth = Component => props => (
  <Consumer>
    {auth => <Component {...props} auth={auth} />}
  </Consumer>
)

export default withAuth
