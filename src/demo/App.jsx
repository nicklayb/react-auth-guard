import React from 'react'
import jwtDecode from 'jwt-decode'
import Provider from '../lib'
import Loading from './Loading'
import NotAuthenticated from './NotAuthenticated'
import Authenticated from './Authenticated'

const authGetters = {
  getUser: () => ({
    firstName: 'Bobby',
    lastName: 'Hill',
  }),
}

const fetchUser = ({ token }) => new Promise((resolve, reject) => {
  const { sub } = jwtDecode(token)
  if (sub.toString() === '1') {
    return resolve()
  }
  return reject()
})

const App = () => (
  <Provider
    fetchUser={fetchUser}
    getters={authGetters}
    onLogout={() => alert('Logout')}
    onLoginFail={() => alert('Could not login')}
    onLogin={({ userId }) => alert(`Login success for userId == ${userId}!`)}
  >
    {({ authenticating, authenticated }) => (
      <Loading isLoading={authenticating}>
        {
          authenticated
            ? <Authenticated />
            : <NotAuthenticated />
        }
      </Loading>
    )}
  </Provider>
)

export default App
