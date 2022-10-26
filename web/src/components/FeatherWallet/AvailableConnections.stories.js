import AvailableConnections from './AvailableConnections'

export const desktop = () => {
  return (
    <div>
      <AvailableConnections
        title="Rainbow Wallet"
        src="/rainbow_wallet.png"
        description="Rainbow is a fun, simple, and secure Ethereum wallet that makes managing your assets a joy."
      />
    </div>
  )
}

export default { title: 'Components/AvailableConnections' }
