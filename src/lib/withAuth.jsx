import React from 'react'
import { Consumer, Context } from './AuthenticationProvider'

export const withAuth = Component => props => (
  <Consumer>
    {auth => <Component {...props} auth={auth} />}
  </Consumer>
)

export const useAuth = () => React.useContext(Context)

