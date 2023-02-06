import { EnvelopError } from '@envelop/core'
import { Contract } from '@ethersproject/contracts'
import { parseUnits } from '@ethersproject/units'

import { logger } from 'src/lib/logger'
import { Web3Providers } from 'src/lib/web3/provider'
import { getTreasureContract } from 'src/lib/web3/treasure'
import { getUsdcContract, USDC_DATA_BY_NETWORK } from 'src/lib/web3/usdc'
import { memberSendTransaction } from 'src/lib/web3/wallets'

const treasureMerketArtifact = require('@treasure-chess/treasure-contracts/artifacts/contracts/TreasureMarket.sol/TreasureMarket.json')

const TREASURE_MARKET_DATA_BY_NETWORK = {
  mumbai: {
    address: '0x0f3E90A31a9f903C70FC139840e28076aE0514F0',
  },
  mainnet: {
    address: '0x0353541BA8968F7831D4F8B3D628AD3d214C9a79',
  },
}

export const getTreasureMarketContract = ({ network }) => {
  try {
    return new Contract(
      TREASURE_MARKET_DATA_BY_NETWORK[network],
      treasureMerketArtifact.abi,
      Web3Providers[network]
    )
  } catch (e) {
    logger.error(e)
    throw new Error(`getTreasureMarketContract() ${e}`)
  }
}

export const checkAndSetMarketApprovals = async ({ member, network }) => {
  try {
    let treasureApprovalTx
    let tokenApprovalTx
    // Approve spending Treasure
    const treasureContract = getTreasureContract({ network })
    const isApprovedForAllTreasures = await treasureContract.isApprovedForAll(
      member.address,
      TREASURE_MARKET_DATA_BY_NETWORK[network]
    )
    if (!isApprovedForAllTreasures) {
      const unsignedTx =
        await treasureContract.populateTransaction.setApprovalForAll(
          TREASURE_MARKET_DATA_BY_NETWORK[network],
          true
        )
      treasureApprovalTx = await memberSendTransaction({
        memberId: member.id,
        unsignedTx,
      })
    }
    // Approve spending ERC20
    const tokenContract = getUsdcContract({ network })
    const allowance = await tokenContract.allowance(
      member.address,
      TREASURE_MARKET_DATA_BY_NETWORK[network]
    )
    const ONE_BILLION_BN = parseUnits('1000000000', 18)
    const TEN_MILLION_BN = parseUnits('10000000', 18)
    if (allowance.lt(TEN_MILLION_BN)) {
      const unsignedTx = await tokenContract.populateTransaction.approve(
        TREASURE_MARKET_DATA_BY_NETWORK[network],
        ONE_BILLION_BN
      )
      tokenApprovalTx = await memberSendTransaction({
        memberId: member.id,
        unsignedTx,
      })
    }
    return { tokenApprovalTx, treasureApprovalTx }
  } catch (e) {
    if (!e.message.includes('insufficient funds for gas')) logger.error(e)
    throw new Error(`checkAndSetMarketApproval() ${e}`)
  }
}

export const list = async ({ treasure, amount, network }) => {
  try {
    if (!treasure) throw 'No treasure provided'
    await checkAndSetMarketApprovals({ member: treasure.owner, network })

    const treasureMarketContract = getTreasureMarketContract({ network })
    const unsignedTx =
      await treasureMarketContract.populateTransaction.tokenListItem(
        treasure.tokenId,
        parseUnits(amount.toString(), USDC_DATA_BY_NETWORK[network].decimals),
        USDC_DATA_BY_NETWORK[network].address
      )
    const tx = await memberSendTransaction({
      memberId: treasure.ownerId,
      unsignedTx,
    })

    return tx
  } catch (e) {
    if (e.error.error['code'] === -32000)
      throw new EnvelopError(
        'Things are a bit congested now, please try again in a few minutes'
      )
    logger.error(e)
    throw new Error(`list() ${e}`)
  }
}

export const unlist = async ({ treasure, network }) => {
  try {
    if (!treasure) throw 'No treasure provided'
    await checkAndSetMarketApprovals({ member: treasure.owner, network })

    const treasureMarketContract = getTreasureMarketContract({ network })
    const unsignedTx =
      await treasureMarketContract.populateTransaction.tokenUnlistItem(
        treasure.tokenId
      )
    const tx = await memberSendTransaction({
      memberId: treasure.ownerId,
      unsignedTx,
    })
    return tx
  } catch (e) {
    logger.error(e)
    throw new Error(`unlist() ${e}`)
  }
}

export const buy = async ({ treasure, network }) => {
  try {
    if (!treasure) throw 'No treasure provided'
    await checkAndSetMarketApprovals({ member: context.currentUser, network })

    const treasureMarketContract = getTreasureMarketContract({ network })
    const unsignedTx =
      await treasureMarketContract.populateTransaction.tokenInstantBuy(
        treasure.tokenId,
        USDC_DATA_BY_NETWORK[network].address
      )
    const tx = await memberSendTransaction({
      memberId: context.currentUser.id,
      unsignedTx,
    })

    return tx
  } catch (e) {
    logger.error(e)
    throw new Error(`buy() ${e}`)
  }
}
