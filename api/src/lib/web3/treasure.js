import { Contract } from '@ethersproject/contracts'

import { logger } from 'src/lib/logger'
import { Web3Providers } from 'src/lib/web3/provider'

const treasureArtifact = require('@treasure-chess/treasure-contracts/artifacts/contracts/Treasure.sol/Treasure.json')

const treasureAbi = treasureArtifact.abi

const TREASURE_DATA_BY_NETWORK = {
  mumbai: {
    address: '0xc9234371D7943C0A333AB1eE4e9E6583323efD5d',
  },
  mainnet: {
    address: '0x9d7b22aF44D4510ED2372814f18d78Fb3eDA6C44',
  },
}

export const getTreasureContract = ({ network }) => {
  try {
    return new Contract(
      TREASURE_DATA_BY_NETWORK[network].address,
      treasureAbi,
      Web3Providers[network]
    )
  } catch (e) {
    logger.error(e)
    throw new Error(e)
  }
}

export const mint = async ({
  treasure,
  tokenUri,
  minterAddress,
  network,
  // gasMultiplier = 1,
}) => {
  try {
    if (!minterAddress) throw 'No minterAddress provided'
    if (!tokenUri) throw 'No tokenUri provided'
    if (!treasure) throw 'No treasure provided'
    // if (gasMultiplier > 1.25)
    //   throw `Gas multiplier cannot be higher than 1.25, value is ${gasMultiplier}`
    const treasureContract = getTreasureContract({ network })

    // Lookup the number of each achievement
    let chievScore = [0, 0, 0]

    let unsignedTx
    try {
      unsignedTx = await treasureContract.populateTransaction.mint(
        minterAddress, // address player
        tokenUri, // string memory tokenURI
        treasure.id, //bytes32 moveHash
        treasure.achievementScore, // uint8 _level
        chievScore[0], // uint16 _achievement1
        chievScore[1], // uint16 _achievement2
        chievScore[2], // uint16 _achievement3
        treasure.cardColor === 'black' // bool _color);
      )
    } catch (e) {
      logger.error(e)
    }
    logger.debug({ custom: { ...unsignedTx } }, 'unsignedTx')
    // const tx = await adminSendTransaction({ unsigned: unsignedTx, network })
    // logger.debug({ custom: { ...tx } }, 'tx')
    // return tx
    return null
  } catch (e) {
    throw new Error(`mint() ${e}`)
  }
}

export const getTokenIdFromHashId = async ({ hashId, network }) => {
  try {
    if (!hashId) throw 'No hashId provided'
    const treasureContract = getTreasureContract({ network })
    const tokenId = await treasureContract.movesHashToId(hashId)
    return tokenId
  } catch (e) {
    logger.error(e)
    throw new Error(`getTokenIdFromHashId() ${e}`)
  }
}

export const getERC721Balance = async ({
  contractAddress,
  userAddress,
  network,
}) => {
  const contract = new Contract(
    contractAddress,
    treasureAbi,
    Web3Providers[network]
  )
  return await contract.balanceOf(userAddress)
}

export const totalSupply = async ({ network }) => {
  const treasureContract = getTreasureContract({ network })
  const supply = await treasureContract.getTotalGames()
  return supply.toString()
}
