export const isBrowser = typeof window !== 'undefined'
export const isProduction = process.env.NODE_ENV === 'production'
export const isMobile =
  isBrowser && window.matchMedia('(max-width: 767px)').matches

export const getBlockExplorerUrl = (address) => {
  const POLYGONSCAN_URL = 'https://polygonscan.com/address/'
  return POLYGONSCAN_URL + address
}
