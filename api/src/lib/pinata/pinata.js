import fetch from 'cross-fetch'
import { logger } from 'src/lib/logger'

import { getDescription, getAttributes } from 'src/lib/pinata/helpers'

const PINATA_API_URL = 'https://api.pinata.cloud'
const PINATA_API_KEY = process.env.PINATA_API_KEY
const PINATA_API_SECRET_KEY = process.env.PINATA_API_SECRET_KEY
const TOKEN_URI_DOMAIN = process.env.APP_DOMAIN

const pinJson = async (jsonString) => {
  try {
    const response = await fetch(`${PINATA_API_URL}/pinning/pinJSONToIPFS`, {
      method: 'post',
      body: jsonString,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET_KEY,
      },
    }).then((res) => {
      return res.json()
    })

    if (!response.IpfsHash) throw `Couldn't pin JSON: ${jsonString}`
    return `ipfs://${response.IpfsHash}`
  } catch (e) {
    logger.error(e)
    throw `pinJson() ${e}`
  }
}

const ipfsUrlToPinata = (ipfsUrl) =>
  'https://chess.mypinata.cloud/ipfs/' + ipfsUrl.split('ipfs://')[1]

export const pinTreasure = async ({ treasure, gameId }) => {
  try {
    // Setup
    const attributes = getAttributes({ ...treasure })

    const uriData = {
      description: getDescription({ opening: treasure.opening }), // TODO: Update copy for this
      external_url: `${TOKEN_URI_DOMAIN}/treasures`,
      name: treasure.title,
      gameId,
      treasureId: treasure.id,
      endTime: treasure.endTime,
      attributes,
    }
    const stringifiedUriData = JSON.stringify(uriData)
    // logger.debug({ custom: uriData }, 'uriData')
    const tokenUri = await pinJson(stringifiedUriData)

    let customLog = ''
    try {
      ;[tokenUri].map((ipfs) => {
        try {
          customLog += `${ipfsUrlToPinata(ipfs)}, `
        } catch (e) {
          throw ipfs
        }
      })
    } catch (e) {
      throw `error getting ipfs url: ${e}`
    }
    logger.info(customLog)

    return { tokenUri, uriData: stringifiedUriData }
  } catch (e) {
    throw `pinTreasure() ${e}`
  }
}
