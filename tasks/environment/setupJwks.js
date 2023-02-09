const fs = require('fs')
const path = require('path')

const directoryPath = path.join(__dirname, '../../')
const dotenv = require('dotenv')

const { decrypt } = require('./cryptography')

dotenv.config()

const arg = process.argv[2]
let environment = arg ? arg : process.env.ENVIRONMENT
if (!environment || environment === 'local') environment = 'dev'

const setupJwks = () => {
  const encryptedJwks = require(path.join(
    directoryPath,
    `api/src/lib/jwks/jwks.${environment}.js.enc`
  ))
  let decryptedJwks
  const key =
    process.env[`${environment.toUpperCase()}_ENCRYPTION_KEY`] ||
    process.env.ENCRYPTION_KEY
  try {
    decryptedJwks = decrypt({ encrypted: encryptedJwks, key })
  } catch (e) {
    return console.log(
      `Decryption failed! Check encryption key\nNODE_ENV: ${environment}\nkey: ${key.substring(
        0,
        3
      )}...`
    )
  }

  // Save jwks to file
  const jwksContents = `module.exports = ${decryptedJwks}`
  fs.writeFileSync(`./api/src/lib/jwks/jwks.js`, jwksContents)
}

setupJwks()
