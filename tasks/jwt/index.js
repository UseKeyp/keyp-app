const jwt = require('jsonwebtoken')
const fs = require('fs')
const jwksClient = require('jwks-rsa')

var privateKey = fs.readFileSync('privateKey.pem', 'utf8')
const publicKey = fs.readFileSync('publicKey.pem', 'utf8')

const generateIdToken = () => {
  var token = jwt.sign(
    {
      sub: 'Custom JWT for Web3Auth Custom Auth',
      name: 'Patrick',
      email: 'patrick@niftychess.com',
      aud: 'urn:feather-collabland-demo',
      iss: 'https://api.feather.niftychess.com',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    privateKey,
    {
      algorithm: 'RS256',
      // NOTE get kid with openssl rand -hex 12
      header: { alg: 'RS256', kid: '75d809beae4c8e9212a83874b' },
    }
  )
  return token
}

// Create JWKs using the tool https://russelldavies.github.io/jwk-creator/
const testJwks = async (token) => {
  const client = jwksClient({
    jwksUri:
      'https://gist.githubusercontent.com/pi0neerpat/e5f018e37bf87737369e8737413e1894/raw/e563efc417fd91f6cca24ed17003eeed8f8538b7/test-jwks.json',
    requestHeaders: {}, // Optional
    timeout: 30000, // Defaults to 30s
  })

  const kid = '75d809beae4c8e9212a83874b'
  const key = await client.getSigningKey(kid)
  const signingKey = key.getPublicKey()
  console.log(signingKey)

  const decoded = jwt.verify(
    token,
    signingKey,
    { algorithms: ['RS256'] },
    (err, _decoded) => {
      if (err) throw err
      return _decoded
    }
  )
  console.log(decoded)
}

const token = generateIdToken()
testJwks(token)
