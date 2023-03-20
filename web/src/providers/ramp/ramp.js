import { useMutation, useQuery } from '@apollo/client'

import { useAuth } from '@redwoodjs/auth'
import { isBrowser } from '@redwoodjs/prerender/browserUtils'
import { Link } from '@redwoodjs/router'

import Icon from 'src/components/Icon/Icon'
import { TxToast } from 'src/providers/market/toasts'
import { useOAuth } from 'src/providers/oAuth'
import { useToast } from 'src/providers/toast'
import popupLoadingHtml from 'src/utils/popupLoadingHtml'

import {
  USER_RAMPS_QUERY,
  RAMP_WITHDRAW_MUTATION,
  RAMP_URL_MUTATION,
} from './graphql'

const EXTERNAL_TRANSFER = 'EXTERNAL_TRANSFER'
const COINBASE = 'COINBASE'

const RampContext = React.createContext({
  isLoading: true,
})

const useRamp = () => React.useContext(RampContext)

const RampProvider = ({ children }) => {
  const { isAuthenticated, currentUser } = useAuth()

  const { toast } = useToast()
  const { openOAuthUrl } = useOAuth()

  const [state, setState] = React.useState({
    isLoading: false,
    error: null,
  })
  const [coinbase, setCoinbase] = React.useState({})
  const [pelerin] = React.useState({})
  const externalTransfer = {
    name: 'Web3 Wallet',
    isLoading: false,
    type: EXTERNAL_TRANSFER,
    icon: (
      <div className="flex py-1 justify-center flex-row items-center">
        <div className="w-6 h-6 m-4 min-w-6 min-h-6">
          <Icon name="metamask" className="w-6 h-6 m-4" />
        </div>
        <img
          alt="rainbow"
          src="/rainbow_wallet.png"
          width="32px"
          className="ml-2"
        />
        <h2 className="ml-2">{t('Web3 wallet')}</h2>
      </div>
    ),
    description: (
      <>
        <p>
          Regions: All
          <br />
          Fee: none
        </p>
      </>
    ),
    disabled: !currentUser?.betaAccess,
    helperText: (
      <p className="italic">
        <Trans i18nkey="web:requestBetaAccess">
          <b>Beta feature</b>. Request to be a Beta Tester in{' '}
          <Link className="underline">Settings</Link>.
        </Trans>
      </p>
    ),
  }

  const { error: rampError, loading: rampsLoading } = useQuery(
    USER_RAMPS_QUERY,
    {
      pollInterval: 30000,
      skip: !isAuthenticated,
      fetchPolicy: 'network-only',
      onError: () => {
        setState({
          error: 'Something went wrong loading cash out providers',
          isLoading: false,
        })
      },
      onCompleted: async ({ ramps } = {}) => {
        const coinbaseRamp = ramps.find((ramp) => ramp.type === COINBASE)
        setCoinbase({ ...coinbaseRamp, ...coinbase })
      },
    }
  )

  const [rampUrlMutation] = useMutation(RAMP_URL_MUTATION, {
    fetchPolicy: 'network-only',
    // nextFetchPolicy: 'cache-first',
  })

  const [rampWithdrawMutation] = useMutation(RAMP_WITHDRAW_MUTATION)

  const submitRamp = async ({ type, direction, amount, reconnect }) => {
    if (direction === 'ON') return getRampUrl({ type, direction })
    if (direction === 'OFF') {
      if (amount && !reconnect) {
        if (type === 'COINBASE') return withdrawCoinbase(amount)
      }
      if (type === 'COINBASE') return connectCoinbase()
    }
  }

  const getRampUrl = async ({ type, direction }) => {
    let myWindow
    try {
      myWindow = window.open(
        '',
        '_blank',
        'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
      )
      myWindow.document.write(popupLoadingHtml)
      setState({ ...state, isLoading: type, rampError: '' })
      const { data, error } = await rampUrlMutation({
        variables: { direction, type },
      })
      if (error) throw error
      const {
        getRampUrl: { url },
      } = data
      if (isBrowser && url) {
        myWindow.location = url
        setState({ ...state, isLoading: false, rampError: '' })
      }
    } catch (e) {
      setState({ ...state, isLoading: false, rampError: e })
      myWindow.document.write(
        `<h3>Oops! An error occured<br/><br/>Sending you back...</h3><p>${e}</p>`
      )
      setTimeout(() => {
        myWindow.close()
      }, 3000)
    }
  }
  const connectCoinbase = async () => {
    try {
      setCoinbase({
        ...coinbase,
        isLoading: true,
        error: null,
        successText: t('Please refresh the page after connecting.'),
      })
      await openOAuthUrl(COINBASE)
    } catch (error) {
      coinbase.error = error
      return setCoinbase({
        ...coinbase,
        isLoading: false,
        error: error,
        successText: '',
      })
    }
  }

  const withdrawCoinbase = async (amount) => {
    try {
      if (amount < 1)
        return setCoinbase({
          ...coinbase,
          isLoading: false,
          error: t('Amount must be greater than 0'),
          successText: null,
        })
      await setCoinbase({ isLoading: true, error: null, ...coinbase })
      const {
        data: { rampWithdraw },
      } = await rampWithdrawMutation({
        variables: { type: COINBASE, amount },
      })
      toast.success(
        <TxToast text={t('Withdraw submitted')} txHash={rampWithdraw.id} />,
        { id: rampWithdraw.id }
      )
      await setCoinbase({
        ...coinbase,
        isLoading: false,
        disabled: true,
        buttonText: t('In progress'),
        successText: t(
          'Funds are on their way! Please allow 3 days for the transfer to complete.'
        ),
      })
    } catch (e) {
      await setCoinbase({ ...coinbase, isLoading: false, error: e.message })
    }
  }
  return (
    <RampContext.Provider
      value={{
        isLoading: state.isLoading || rampsLoading,
        rampError: rampError || state.rampError,
        submitRamp,
        offRamps: [coinbase, pelerin, externalTransfer],
      }}
    >
      {children}
    </RampContext.Provider>
  )
}

export { RampProvider, useRamp }
