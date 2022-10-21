import { MetaTags } from '@redwoodjs/web'
import FeatherWallet from 'src/components/FeatherWallet/FeatherWallet'
import AssetCard from 'src/components/AssetCard/AssetCard'
import ProfileCard from 'src/components/ProfileCard/ProfileCard'
import Dashboard from 'src/components/Dashboard/Dashboard'

const FeatherWalletPage = () => {
  const tableData = [
    {
      title: 'Row title',
      country: 'United States',
      sales: '2500',
      value: '$230,900',
      bounce: '29.9%',
    },
    {
      title: 'Row title',
      country: 'Yemen',
      sales: '3500',
      value: '$100,900',
      bounce: '42.9%',
    },
    {
      title: 'Row title',
      country: 'Germany',
      sales: '12',
      value: '$80,900',
      bounce: '6.09%',
    },
  ]

  return (
    <>
      <MetaTags
        title="Feather Wallet"
        description="Access all your wallet resources here."
      />
      <Dashboard data={tableData} />
      <div className="text-left font-bold mb-4">User</div>
      <div className="mb-4">
        <ProfileCard
          name="Name (Optional)"
          username="@username"
          src="/icons/WK.svg"
          description="User is a web3 developer and is learning how to use the app to create her own applications"
          address="0x0000000000000000000000000000000000000000"
        />
      </div>
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
      <div className="text-left font-bold mb-4 mt-4">Assets</div>
      <div className="flex bg-chessBlack-100 gap-2 p-2 rounded-xl flex-col">
        <AssetCard
          asset="Chess coin"
          src="/icons/WK.svg"
          balance="500"
          acronym="CC"
          description="Chess coin is an ERC20 token brought to you by Magnus Carlsen"
        />
        <AssetCard
          asset="Discoin"
          src="/icons/discord.svg"
          balance="220"
          acronym="DC"
          description="Discoin is an ERC20 token"
        />
      </div>
    </>
  )
}

export default FeatherWalletPage
