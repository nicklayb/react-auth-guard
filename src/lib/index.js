import AuthenticationProvider, {
  Consumer as AuthenticatonConsumer,
} from './AuthenticationProvider'
import { withAuth, useAuth } from './withAuth'

export default AuthenticationProvider

export {
  AuthenticatonConsumer,
  withAuth,
  useAuth,
}
