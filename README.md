# react-auth-guard

A React context component to provide authentication through the app. The provider is decoupled from user persistance layout. It does not use/need Redux.

## Installation

Install the package using the following command

```shell
yarn add react-auth-guard
//
npm i -s react-auth-guard
```

## Setup

"Talking is cheap show me the code" checkout the `src/demo` folder to get example implementation.

### Setup provider

Setup the application provider as the following. The only required props is the `fetchUser` function which should return a Promise. That Promise is used to check the validity of the token. If it resolves, then the app is considered authenticated, otherwise the app is considered not authenticated. As an example, this function can be a redux action to get the current user object from the server and stores it the Redux store.

```js
import fetchUser from './actions'
import Provider from 'react-auth-guard'

const App = () => (
  <Provider
    fetchUser={fetchUser}
  >
    {({ authenticating, authenticated }) => (
      /* Render your application */
    )}
  </Provider>
)
```

### Handle authentication flow

I like using a `<Loading />` components while the API authenticates. So if you reach to the URL and have a token in your local storage, it'll show a spinner the `fetchUser` promise is either resolved or reject.
```js
import fetchUser from './actions'
import Provider from 'react-auth-guard'
import NotAuthenticated from './NotAuthenticated'
import Authenticated from './Authenticated'

const Loading = ({ isLoading, children }) => (isLoading
  ? <h1>Loading</h1>
  : children
)

const App = () => (
  <Provider
    fetchUser={() => new Promise(resolve => resolve())}
    getters={authGetters}
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
```

### Login the provider

To login the provider, you have to call the `updateToken` function from the render prop or the consumer (You may also use the `withAuth` higher-order components to connect the auth props).

As shown below, the auth object is provided by the `withAuth` HOC to the component.

```js
const NotAuthenticated = ({ auth }) => {
  const login = () => loginUser().then(({ token }) => {
    auth.updateToken(token)
  })

  return (
    <div>
      <h1>NotAuthenticated</h1>
      <button type="button" onClick={login}>Login</button>
    </div>
  )
}

export default withAuth(NotAuthenticated)
```

### Logout the provider

The Consumer (and the HOC) also exposes a `logout` function that clears the token from the persistance strategy and unauthenticate the provider.

```js
const Navbar = ({ auth }) => {(
  <div>
    <button type="button" onClick={auth.logout}>Logout</button>
  </div>
)

export default withAuth(NotAuthenticated)
```

## Props

- `fetchUser`: **required** Callbacks that takes no parameter and returns a Promise.
- `getters`: Object that helps getting things based on the provider state see [Getters](#getters)
- `decodeToken`: Function that decodes the token. Uses `jwt-decode` as default
- `getDecodedUserId`: Function that decodes the user id from the decoded token. By default is returns the `sub` part of the token.
- `persistStrategy`: A persistancy strategy object. May be useful to override if you want to persist the token in `AsyncStorage` for a React-Native usecase. Defaults to a localStorage handle, refer to [Persistance strategy](#persistance-strategy) for more info.
- `children`: Function that expose the render props

## Render props

- `token`: The persisted token
- `authenticating`: `true` if the `fetchUser` prop is being called.
- `authenticated`: `true` if the `fetchUser` prop has resolved
- `userId`: Decoded user id from the token
- `updateToken: (token: string) => void`: Updates the token persisted token for the provided one and dispatch the `fetchUser` function prop.
- `logout: () => void`: Clears the persisted token and sets authenticated to false

## Getters

### Why?
What makes the provider easy to use, is because he's decoupled with app state. So if you're using GraphQL or json:api compliant api. The provider don't needs to know.

Getters allows you to inject function that get available in your auth provider without composing HOC or things. For instance, I used a json:api compliant app where my local user is stored in redux other entities. Without getters, I was forced to always use Redux`s connect composed with `withAuth` HOC everytime I wanted to use my current user. I added a `getUser` getter to the provider which calls calls my Redux store.

### How?

Every getters receive the provider state as the first parameters like the following. Let say our app really requires a way to pad the user id.

```js

const authGetters = {
  paddedId: (providerState) => providerState.userId.toString().padStart(5, '0')
}

const Navbar = ({ auth }) => {(
  <div>
    <h1>{auth.paddedId()}</h1> /* renders "00001" if the user id is 1 */
    <button type="button" onClick={auth.logout}>Logout</button>
  </div>
)

export default withAuth(NotAuthenticated)
```

## Persistance strategy

As said earlier, you may not want to persist the token in the localStorage. You may be working on a React-Native app that needs to store it in `AsyncStorage`.

A persistance strategy is only an object that implements three functions:

- `get: () => void`: Gets the token from the persistance
- `persist: (token: string) => void`: Persists the given token
- `clear: () => void`: Removes the token

## Flow

The provider mounts with `authenticated` to `false` and `authenticating` to `true` to load a loading screen.

By defaults, it uses the `localStorage` strategy to handle token persistancy in the `localStorage`. When the provider is mounted, the `get` method from the strategy is called to get the currently persisted token.

If a token is present (not `null`), the provider will call the `fetchUser` function which should be used as a test with the server to validate the token. The function **must** return a Promise and must resolve only if the token is valid.

If the promise resolves, `authenticated` will be true and `authenticating` will be set to false. So you may render the app as authenticated.
If the promise rejects, `authenticated` will be false and `authenticating` will also be set to false. The app will render not authenticated.
