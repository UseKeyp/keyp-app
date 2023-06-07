import { addErrorLocation } from 'src/lib/helpers'
import { writeMethod, readMethod } from 'src/lib/web3/contracts'

import { withUser } from '../middleware/user'

var express = require('express')
var router = express.Router()

router.post('/method', withUser, async (req, res, next) => {
  try {
    const tx = await writeMethod({
      user: req.ctx.user,
      network: req.ctx.network,
      ...req.body,
    })

    res.send(tx)
  } catch (e) {
    console.log(e)
    next(addErrorLocation('/method', e))
  }
})

router.get('/method', async (req, res, next) => {
  try {
    const response = await readMethod({ network: req.ctx.network, ...req.body })

    res.send(response)
  } catch (e) {
    next(addErrorLocation('/method', e))
  }
})

module.exports = router
