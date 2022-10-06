import { MetaTags } from '@redwoodjs/web'
import FeatherWallet from 'src/components/FeatherWallet/FeatherWallet'

const FeatherWalletPage = () => {
  return (
    <>
      <MetaTags
        title="Feather Wallet"
        description="Access all your wallet resources here."
      />
      <div className="text-left font-bold mb-4">Available Connections</div>
      <div className="flex bg-chessBlack-100 gap-2 p-2 rounded-xl flex-row">
        <FeatherWallet
          title="Rainbow Wallet"
          src="/rainbow_wallet.png"
          description="Rainbow is a fun, simple, and secure Ethereum wallet that makes managing your assets a joy."
        />
        <FeatherWallet
          title="Rainbow Wallet"
          src="/rainbow_wallet.png"
          description="Rainbow is a fun, simple, and secure Ethereum wallet that makes managing your assets a joy."
        />
        <FeatherWallet
          title="Rainbow Wallet"
          src="/rainbow_wallet.png"
          description="Rainbow is a fun, simple, and secure Ethereum wallet that makes managing your assets a joy."
        />
      </div>
    </>
  )
}

export default FeatherWalletPage
