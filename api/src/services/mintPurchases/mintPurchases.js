import { EnvelopError } from '@envelop/core'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import {
  validateMintRequest,
  processPendingPurchases,
  processMintBalanceRequest,
} from 'src/lib/mintPurchases'
import { createCheckoutSession } from 'src/lib/stripe'
import { createMintReservation } from 'src/lib/wyre'

export const mintPurchases = () => {
  return db.mintPurchase.findMany({
    where: { user: { id: context.currentUser.id } },
    orderBy: [{ updatedAt: 'desc' }],
  })
}

export const pendingMintPurchases = () => processPendingPurchases()

export const cancelMintingPurchase = async ({ id }) => {
  const { userId } = await db.mintPurchase.findFirst({
    where: { id },
  })

  if (userId !== context.currentUser.id) throw new EnvelopError('Unauthorized')
  return await db.mintPurchase.delete({ where: { id } })
}

export const mintBalance = async ({
  gameId,
  endTime,
  title,
  paymentType,
  network,
}) => {
  await validateMintRequest({ gameId, endTime, title })
  logger.debug(
    `title: ${title}, context.currentUser.id: ${context.currentUser.id}`
  )
  return processMintBalanceRequest({
    gameId,
    endTime,
    title,
    paymentType,
    network,
  })
}

export const mintCheckoutUrl = async ({
  gameId,
  endTime,
  title,
  paymentType,
}) => {
  await validateMintRequest({ gameId, endTime, title, paymentType })
  const { username, address, id: userId } = context.currentUser

  const { email } = db.user.findFirst({
    where: { id: userId },
  })

  let url
  let reservation
  let paymentIntentId
  if (paymentType === 'STRIPE') {
    ;({ url, paymentIntentId } = await createCheckoutSession({
      metadata: { username, gameId, endTime, address, title },
      email,
    }))
  } else if (paymentType === 'WYRE') {
    ;({ url, reservation } = await createMintReservation({
      username,
      gameId,
      endTime,
      address,
      title,
    }))
  } else {
    throw new Error('Payment provider not found')
  }
  await db.mintPurchase.create({
    data: {
      user: { connect: { id: userId } },
      reservation,
      gameId,
      // If Stripe, then we can set the payment intent now
      ...(paymentIntentId && { orderId: paymentIntentId }),
      gameEndTime: endTime,
      title,
      paymentType,
      orderStatus: 'RESERVATION',
    },
  })
  return url
}

export const MintPurchase = {
  user: (_obj, { root }) =>
    db.mintPurchase.findUnique({ where: { id: root.id } }).user(),
  treasure: (_obj, { root }) =>
    db.mintPurchase.findUnique({ where: { id: root.id } }).treasure(),
}
