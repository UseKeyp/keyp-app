import { writeMethod, readMethod } from 'src/lib/web3'

import { withUser } from '../middleware/user'

var express = require('express')
var router = express.Router()

router.post('/method', withUser, async (req, res) => {
  // Validate juicebox contract address

  const tx = await writeMethod({
    user: req.ctx.user,
    ...req.body,
  })

  res.send(tx)
})

router.get('/method', async (req, res) => {
  const response = await readMethod(req.body)

  res.send(response)
})

module.exports = router
