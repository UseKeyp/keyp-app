const { id: sha3 } = require('@ethersproject/hash')
const { Wallet: EthersWallet } = require('@ethersproject/wallet')
const rug = require('random-username-generator')

const {
  parseGameFromChessDotCom,
} = require('../../api/src/lib/chessCom/gameParsing')
const { getGifUrl } = require('../../api/src/lib/chessCom/gifGetter')

const countries = require('./data/countries')
const deltaRating = require('./data/deltaData.json')
const randomAvatarsBase64 = require('./data/randomAvatarsBase64.js')
const PROVIDERS = [
  'CHESS',
  'DISCORD',
  'GOOGLE',
  'NATIVE',
  'APPLE',
  'TWITTER',
  'ETHEREUM',
]

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const generateRandomMembers = (count, highestMemberId) => {
  return Array(count)
    .fill(null)
    .map((_, index) => {
      const randomUsername = rug.generate()
      const randomAddress = EthersWallet.createRandom().address
      const rand = Math.random()
      return {
        id: (highestMemberId + index).toString(),
        provider: PROVIDERS[Math.floor(Math.random() * PROVIDERS.length)],
        username: randomUsername.toLowerCase(),
        address: randomAddress.toLowerCase(),
        imageSrc: `data:image/jpeg;base64,${
          randomAvatarsBase64[randomInt(0, 199)]
        }`,
        country: countries[Math.floor(Math.random() * countries.length)],
      }
    })
}

module.exports = { generateRandomMembers }
