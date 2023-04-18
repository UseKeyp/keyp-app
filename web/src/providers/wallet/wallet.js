import { useQuery } from '@apollo/client'

import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'

import { useModal } from 'src/hooks/useModal'
import { useToast } from 'src/providers/toast'

import {
  USER_BALANCE_QUERY,
  TRANSFER_ERC721_MUTATION,
  TRANSFER_ERC20_MUTATION,
  TRANSFER_USDC_MUTATION,
} from './graphql'
import { AddressModal } from './modals'

const WalletContext = React.createContext({
  balanceLoading: true,
  usdcBalance: null,
  mintCreditBalance: null,
})

const WalletProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [state, setState] = React.useState({
    usdcBalance: null,
    mintCreditBalance: null,
    addressToCopy: '',
  })
  const [transferErc20Loading, setTransferErc20Loading] = React.useState(false)
  const [transferErc20Error, setTransferErc20Error] = React.useState()

  const [transferErc721Loading, setTransferErc721Loading] =
    React.useState(false)
  const [transferErc721Error, setTransferErc721Error] = React.useState()

  const [transferUsdcLoading, setTransferUsdcLoading] = React.useState(false)
  const [transferUsdcError, setTransferUsdcError] = React.useState()

  const { isVisible: isVisibleAdd, toggleModal: toggleModalAdd } = useModal()

  const {
    data: { userBalance } = {},
    error: balanceError,
    loading: balanceLoading,
  } = useQuery(USER_BALANCE_QUERY, {
    variables: { network: 'POLYGON' },
    pollInterval: 30000,
    skip: !isAuthenticated,
    fetchPolicy: 'network-only',
  })
  const [transferErc20Mutation] = useMutation(TRANSFER_ERC20_MUTATION)
  const [transferErc721Mutation] = useMutation(TRANSFER_ERC721_MUTATION)
  const [transferUsdcMutation] = useMutation(TRANSFER_USDC_MUTATION)

  const getAddress = (address) => {
    // Set the correct address here before opening the modal
    // Necessary for "donating" to other users
    setState({ ...state, addressToCopy: address })
    toggleModalAdd()
  }

  const transferErc721 = async (args) => {
    try {
      setTransferErc721Loading(true)
      setTransferErc721Error(false)

      const { error, data } = await transferErc721Mutation({ variables: args })
      if (error) {
        if (error.error.error['code'] === -32000)
          throw 'Things are a bit congested now, please try again in a few minutes'
        else throw error
      }
      return data
    } catch (e) {
      toast.error(e?.message)
      setTransferErc721Error(e?.message)
      setTransferErc721Loading(false)
    }
  }
  const transferErc20 = async (args) => {
    try {
      setTransferErc20Loading(true)
      setTransferErc20Error(false)

      const { error, data } = await transferErc20Mutation({ variables: args })
      if (error) {
        if (error.error.error['code'] === -32000)
          throw 'Things are a bit congested now, please try again in a few minutes'
        else throw error
      }
      return data
    } catch (e) {
      toast.error(e?.message)
      setTransferErc20Error(e?.message)
      setTransferErc20Loading(false)
    }
  }

  const transferUsdc = async (args) => {
    try {
      setTransferUsdcLoading(true)
      setTransferUsdcError(false)

      const { error, data } = await transferUsdcMutation({ variables: args })
      if (error) {
        if (error.error.error['code'] === -32000)
          throw 'Things are a bit congested now, please try again in a few minutes'
        else throw error
      }
      return data
    } catch (e) {
      toast.error(e?.message)
      setTransferUsdcError(e?.message)
      setTransferUsdcLoading(false)
    }
  }

  React.useEffect(() => {
    setState({
      ...state,
      ...(userBalance || {}),
    })
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [userBalance])
  return (
    <WalletContext.Provider
      value={{
        getAddress,
        usdcBalance: state.usdcBalance,
        mintCreditBalance: state.mintCreditBalance,
        balanceError,
        balanceLoading,
        transferErc721,
        transferErc721Error,
        transferErc721Loading,
        transferErc20,
        transferErc20Error,
        transferErc20Loading,
        transferUsdc,
        transferUsdcError,
        transferUsdcLoading,
      }}
    >
      <AddressModal
        address={state.addressToCopy}
        isVisible={isVisibleAdd}
        toggleModal={toggleModalAdd}
      />
      {children}
    </WalletContext.Provider>
  )
}

const useWallet = () => React.useContext(WalletContext)

export { WalletProvider, useWallet }
