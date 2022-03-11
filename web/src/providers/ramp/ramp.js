import { useQuery, useLazyQuery } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'

import {
  MEMBER_RAMPS_QUERY,
  WYRE_DEPOSIT_URL_QUERY,
  OAUTH_URL_QUERY,
  CONNECT_PLAID_QUERY,
} from './graphql'

const PLAID = 'plaid'
const COINBASE = 'COINBASE'
const WYRE = 'WYRE'

const RampContext = React.createContext({
  isLoading: true,
})

const RampProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const [shouldPoll, setShouldPoll] = React.useState(true)
  const [coinbase, setCoinbase] = React.useState({
    isLoading: false,
    isConnected: false,
    name: 'Coinbase',
  })
  const [wyre, setWyre] = React.useState({
    isLoading: false,
    isConnected: false,
    name: 'Wyre + Plaid',
  })

  const {
    data: { ramps } = {},
    error: rampError,
    loading: rampsLoading,
  } = useQuery(MEMBER_RAMPS_QUERY, {
    pollInterval: 30000,
    skip: !isAuthenticated,
    fetchPolicy: 'network-only',
  })
  const updateRamps = () => {
    console.log(ramps)
    const coinbaseRamp = ramps.find((ramp) => ramp.type === COINBASE)
    const wyreRamp = ramps.find((ramp) => ramp.type === WYRE)
    setCoinbase({
      ...coinbase,
      ...coinbaseRamp,
    })
    setWyre({
      ...wyre,
      ...wyreRamp,
    })
  }

  React.useEffect(() => {
    if (!ramps) return
    updateRamps()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [ramps])

  const [wyreDepositUrlQuery] = useLazyQuery(WYRE_DEPOSIT_URL_QUERY, {
    fetchPolicy: 'network-only',
  })
  const [oAuthUrlQuery] = useLazyQuery(OAUTH_URL_QUERY, {
    fetchPolicy: 'network-only',
  })
  const [connectPlaidQuery] = useLazyQuery(CONNECT_PLAID_QUERY, {
    fetchPolicy: 'network-only',
  })

  const depositWyre = async () => {
    setWyre({ isLoading: true, ...wyre })
    const { data: { wyreDepositUrl } = {} } = await wyreDepositUrlQuery()
    setWyre({ isLoading: false, ...wyre })
    window.open(
      wyreDepositUrl,
      'Treasure Chess - Deposit',
      'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
    )
    // TODO: Close the modal
    // toggleModalDep()
  }

  const connectCoinbase = async () => {
    setCoinbase({ isLoading: true, ...coinbase })
    const { data: { oAuthUrl } = {} } = await oAuthUrlQuery({
      variables: { type: 'coinbase' },
    })
    setCoinbase({ isLoading: false, ...coinbase })
    setShouldPoll(true)
    window.open(
      oAuthUrl.url,
      'Coinbase - Connect',
      'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
    )
  }

  const connectWyre = async () => {
    setWyre({ isLoading: true, ...wyre })
    const { data: { oAuthUrl } = {} } = await oAuthUrlQuery({
      variables: { type: PLAID },
    })
    setWyre({ isLoading: false, ...wyre })
    /* eslint-disable-next-line no-undef */
    var linkHandler = Plaid.create({
      token: oAuthUrl.text,
      /* eslint-disable camelcase*/
      onSuccess: async (public_token, metadata) => {
        const accountId = metadata.accounts[0].id
        const { data: wyreRamp = {} } = await connectPlaidQuery({
          variables: { code: public_token, accountId },
        })
        // console.log(wyreRamp)
        setWyre({
          ...wyre,
          ...wyreRamp,
        })
        // TODO: trigger some success notification
      },
      onExit: function (err, _metadata) {
        if (err != null) {
          // TODO: Trigger some error notification
          // The user encountered a Plaid API error prior to exiting.
        }
      },
    })
    linkHandler.open()
  }

  const withdrawCoinbase = async (_amount) => {
    setTimeout(() => {
      setCoinbase({ isLoading: true, ...coinbase })
    }, 2000)
    setCoinbase({ isLoading: false, ...coinbase })
  }
  const withdrawWyre = async (_amount) => {
    setTimeout(() => {
      setWyre({ isLoading: true, ...wyre })
    }, 2000)
    setWyre({ isLoading: false, ...wyre })
  }

  const isLoading = rampsLoading || coinbase.isLoading || wyre.isLoading

  return (
    <RampContext.Provider
      value={{
        isLoading,
        rampError, // Currently unused
        ramps: [
          {
            ...coinbase,
            onConnect: connectCoinbase,
            onWithdraw: withdrawCoinbase,
          },
          {
            ...wyre,
            onConnect: connectWyre,
            onWithdraw: withdrawWyre,
            onDeposit: depositWyre,
          },
        ],
      }}
    >
      {children}
    </RampContext.Provider>
  )
}

const useRamp = () => React.useContext(RampContext)

export { RampProvider, useRamp }
