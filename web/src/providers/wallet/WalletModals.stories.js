import { AddressModal } from './modals'

export const address = () => (
  <AddressModal
    address={'0xabb123'}
    onSubmit={() => {}}
    isVisible={true}
    toggleModal={() => {}}
  />
)

// const coinbaseDetails = { name: 'Coinbase', isConnected: false }

export default { title: 'Modals/WalletModals' }
