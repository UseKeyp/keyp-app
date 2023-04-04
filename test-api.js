const axios = require('axios')

// Local
// const ACCESS_TOKEN = 'lTUJFPGdGW3YaRPUD1QKo6esABjDs9N_K-jIT5tfN24'
// Production
const ACCESS_TOKEN = 'hWYAiMB53ay-mIplvFrGkwUpcVwSeWxus34G65ar3ks'

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
// const data = {
//   toAddress: '',
//   toUserId: 'DISCORD-381135787330109441',
//   tokenAddress: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
//   tokenType: 'ERC20',
//   amount: '.01',
// }

// const options = {
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${ACCESS_TOKEN}`,
//   },
// }

// axios
//   .post('https://api.usekeyp.com/v1/tokens/transfers', data, options)
//   .then((response) => {
//     console.log(response.data)
//   })
//   .catch((error) => {
//     console.error(error)
//   })

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
