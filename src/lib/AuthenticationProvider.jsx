import React from 'react'
import jwtDecode from 'jwt-decode'
import persistLocalStorage from './strategies/localStorage'

const CONTEXT = {
  token: null,
  authenticating: false,
  user: null,
}

const Context = React.createContext(CONTEXT)

const TOKEN_KEY = 'token'

let provider = null

export const getProvider = () => provider

class AuthenticationProvider extends React.Component {
  static defaultProps = {
    getters: {},
    decodeToken: token => jwtDecode(token),
    getDecodedUserId: ({ sub }) => sub,
    persistStrategy: persistLocalStorage(TOKEN_KEY),
    onLogout: () => {},
    onLoginFail: () => {},
    onLogin: () => {},
  }

  constructor(props) {
    super(props)
    this.state = {
      token: props.persistStrategy.get() || null,
      authenticating: true,
      userId: null,
    }
    provider = this
  }

  componentDidMount() {
    if (this.state.token) {
      this.fetchUser()
    }
  }

  get authenticating() {
    return !!this.state.token && this.state.authenticating
  }

  get authenticated() {
    return !!this.state.token && !!this.state.userId && !this.authenticating
  }

  getProviderState() {
    return {
      token: this.state.token,
      authenticating: this.authenticating,
      authenticated: this.authenticated,
      userId: this.state.userId,
      updateToken: this.updateToken,
      logout: this.logout,
      ...this.mapGetters(),
    }
  }

  mapGetters = () => Object.entries(this.props.getters).reduce((acc, [key, getter]) => ({
    [key]: (...params) => getter(this.getProviderState(), ...params),
    ...acc,
  }), {})

  updateToken = async (token) => {
    const { authenticated } = await this.storeToken(token)
    if (!authenticated) {
      return this.fetchUser()
    }
    return Promise.resolve()
  }

  storeToken = token => new Promise((resolve) => {
    this.props.persistStrategy.persist(token)
    this.setState({
      token,
    }, () => resolve(this.getProviderState()))
  })

  fetchUser = async () => {
    try {
      const payload = await this.props.fetchUser(this.getProviderState())
      const decoded = this.props.decodeToken(this.state.token)
      this.handleSuccess(decoded, this.props.onLogin)
      return payload
    } catch (exception) {
      this.handleFailure(this.props.onLoginFail)
      return exception
    }
  }

  logout = () => {
    this.handleFailure(this.props.onLogout)
  }

  handleSuccess(decoded, callback = () => {}) {
    this.setState({
      userId: this.props.getDecodedUserId(decoded),
      authenticating: false,
    }, () => callback(this.getProviderState()))
  }

  handleFailure(callback = () => {}) {
    this.props.persistStrategy.clear()
    this.setState({
      userId: null,
      authenticating: false,
      token: null,
    }, () => callback(this.getProviderState()))
  }

  renderBody() {
    return this.props.children(this.getProviderState())
  }

  render() {
    return (
      <Context.Provider value={this.getProviderState()}>
        {this.renderBody()}
      </Context.Provider>
    )
  }
}

export default AuthenticationProvider

const { Consumer } = Context

export {
  Consumer,
  Context,
}
