import { toast } from '@redwoodjs/web/toast'
import TorusSdk from '@toruslabs/torus-direct-web-sdk'

const AuthContext = React.createContext({
  loading: true,
  isAuthenticated: false,
  userMetadata: null,
  currentUser: null,
})

const AuthProvider = ({ children }) => {
  const [state, setState] = React.useState({
    loading: true,
    isAuthenticated: false,
    userMetadata: null,
    currentUser: null,
    hasError: false,
  })

  const logIn = async (options) => {
    let torusUserData
    try {
      torusUserData = await state.torus.triggerLogin({
        typeOfLogin: 'google',
        verifier: 'googletest',
        clientId:
          '611240558687-r7lns3f17bovvmpufm5f4ha20i6sd1e9.apps.googleusercontent.com',
      })
    } catch (e) {
      console.log(e)
      toast.error('Error logging in with Torus')
    }
    console.log(torusUserData)
  }

  const init = async () => {
    const torus = new TorusSdk({
      baseUrl: `${window.location.origin}/auth`,
      enableLogging: true,
      network: 'testnet', // details for test net
    })
    await torus.init()
    torus.login = login
    setState({ ...state, torus })
  }

  React.useEffect(() => {
    init()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logIn,
        // logOut,
        // signUp,
        // getToken,
        // getCurrentUser,
        // hasRole,
        // reauthenticate,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  return React.useContext(AuthContext)
}

export { AuthContext, AuthProvider, useAuth }
