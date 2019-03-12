import React from 'react'
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

const App = () => (
  <Provider
    fetchUser={() => new Promise(resolve => resolve())}
    getters={authGetters}
    onLogout={() => alert('Logout')}
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
