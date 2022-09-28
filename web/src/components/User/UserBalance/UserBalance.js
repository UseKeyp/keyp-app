import LoadingDots from 'src/components/LoadingDots'
import { useWallet } from 'src/providers/wallet'

const UserBalance = () => {
  const { usdcBalance, balanceError } = useWallet()
  if (balanceError)
    return (
      <div className="userBalance">
        <h4 className="userBalance__title">Couldn&apos;t get balance</h4>
      </div>
    )
  return (
    <div className="userBalance">
      <h4 className="userBalance__title">Balance</h4>
      <h4 className="userBalance__balance">
        {usdcBalance ? (
          `$${
            Number(usdcBalance) > 0
              ? Number(usdcBalance).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : 0
          }`
        ) : (
          <LoadingDots />
        )}
      </h4>
    </div>
  )
}

export default UserBalance
