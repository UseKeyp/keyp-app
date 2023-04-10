const axios = require('axios')

// Local
const ACCESS_TOKEN = '1ue628VFALll8fUUc7jl_6mbTQS0V1ixLp-1s7Pank2'
// Production
// const ACCESS_TOKEN = 'hWYAiMB53ay-mIplvFrGkwUpcVwSeWxus34G65ar3ks'

// ###########################
// User

// GET User

// const userId = 'DISCORD-381135787330109441'
// const options = { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }
// axios
//   .get(`https://api.usekeyp.com/v1/users/${userId}`, options)
//   .then((response) => {
//     console.log(response.data)
//   })
//   .catch((error) => {
//     console.error(error)
//   })

// GET User Balance

// const userId = 'DISCORD-381135787330109441'
// const options = {
//   headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
// }
// axios
//   .get(`https://api.usekeyp.com/v1/users/${userId}/balance`, options)
//   .then((response) => {
//     console.log(response.data)
//   })
//   .catch((error) => {
//     console.error(error)
//   })

// GET User Token Balance

// const userId = 'DISCORD-381135787330109441'
// const tokenAddress = '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063'
// const options = { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }

// axios
//   .get(
//     `https://api.usekeyp.com/v1/users/${userId}/balance/${tokenAddress}`,
//     options
//   )
//   .then((response) => {
//     console.log(response.data)
//   })
//   .catch((error) => {
//     console.error(error)
//   })

// ###########################
// Tokens

// POST Transfer Token

const data = {
  toUserUsername: 'pi0neerpat#1337',
  toUserProviderType: 'DISCORD',
  tokenAddress: '0x9CA6a77C8B38159fd2dA9Bd25bc3E259C33F5E39',
  tokenType: 'ERC20',
  amount: '.01',
}

// const data = {
//   toAddress: '',
//   toUserId: 'DISCORD-381135787330109441',
//   tokenAddress: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
//   tokenType: 'ERC20',
//   amount: '.01',
// }

const options = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
}

axios
  .post(
    'http://localhost:4001/v1/tokens/transfers',
    // "https://api.usekeyp.com/v1/tokens/transfer" ,
    data,
    options
  )
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.error(error)
  })

// Ramps

// GET On Ramp

// const rampType = 'WERT'
// const options = { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }

// axios
//   .get(
//     `https://api.usekeyp.com/v1/ramps/on/${rampType}`,
//     options
//   )
//   .then((response) => {
//     console.log(response.data)
//   })
//   .catch((error) => {
//     console.error(error)
//   })

// GET Off Ramp

// const rampType = 'COINBASE'
// const options = { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }

// axios
//   .get(`https://api.usekeyp.com/v1/ramps/off/${rampType}`, options)
//   .then((response) => {
//     console.log(response.data)
//   })
//   .catch((error) => {
//     console.error(error)
//   })

// GET Method

// const address = '0x9ca6a77c8b38159fd2da9bd25bc3e259c33f5e39'
// method = 'balance'
// args = '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063' // Comma-separated list

// const options = { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }

// axios
//   .get(
//     `http://localhost:4001/v1/contracts/method?address=${address}&method=${method}&args=${args}`,
//     options
//   )
//   .then((response) => {
//     console.log(response.data)
//   })
//   .catch((error) => {
//     console.error(error)
//   })

// POST Method

// const data = {
//   address: '0x55d4dfb578daa4d60380995fff7a706471d7c719',
//   method: 'pay',
//   args: {
//     _projectId: '1',
//     _amount: '10000000',
//     _token: '0x9ca6a77c8b38159fd2da9bd25bc3e259c33f5e39',
//     // ...
//   },
// }

// const options = {
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${ACCESS_TOKEN}`,
//   },
// }

// axios
//   .post(`http://localhost:4001/v1/contracts/method`, data, options)
//   .then((response) => {
//     console.log(response.data)
//   })
//   .catch((error) => {
//     console.error(error)
//   })
