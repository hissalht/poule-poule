import { Router } from 'express'

const router = Router()

router.get('/', function(_req, res) {
  res.send('Hello there :)')
})

export default router
