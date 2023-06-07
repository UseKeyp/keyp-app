import { addErrorLocation } from 'src/lib/helpers'
import { writeMethod, readMethod } from 'src/lib/web3/contracts'

import { withUser } from '../middleware/user'

var express = require('express')
var router = express.Router()

router.post('/method/write', withUser, async (req, res, next) => {
  try {
    const tx = await writeMethod({
      user: req.ctx.user,
      network: req.ctx.network,
      ...req.body,
    })

    res.send(tx)
  } catch (e) {
    next(addErrorLocation('/method/write', e))
  }
})

router.post('/method/read', withUser, async (req, res, next) => {
  try {
    const response = await readMethod({
      user: req.ctx.user,
      network: req.ctx.network,
      ...req.body,
    })

    res.send(response)
  } catch (e) {
    console.log(e)
    next(addErrorLocation('/method/read', e))
  }
})

module.exports = router
