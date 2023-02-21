const fs = require('fs')
const path = require('path')

const directoryPath = path.join(__dirname, '../../')
const dotenv = require('dotenv')

const { decrypt } = require('./cryptography')

dotenv.config()

// Usage example: node tasks/environment/setupEnv.js staging

const arg = process.argv[2]
let environment = arg ? arg : process.env.ENVIRONMENT
if (!environment || environment === 'local') environment = 'dev'

const setupEnvironment = () => {
  const key =
    process.env[`${environment.toUpperCase()}_ENCRYPTION_KEY`] ||
    process.env.ENCRYPTION_KEY

  const encryptedEnv = require(path.join(
    directoryPath,
    `./.env.${environment}.js.enc`
  ))
  let decryptedEnv
  try {
    decryptedEnv = JSON.parse(decrypt({ encrypted: encryptedEnv, key }))
  } catch (e) {
    return console.log(
      `ENV Decryption failed! Check encryption key\nNODE_ENV: ${environment}\nkey: ${key.substring(
        0,
        3
      )}...`
    )
  }

  // Prints environment variables to be set in the shell
  Object.keys(decryptedEnv).map((key) => {
    if (process.env[key]) return // Override a variable using the local .env file
    console.log(`export ${key}=${decryptedEnv[key]}`)
  })
}

setupEnvironment()
