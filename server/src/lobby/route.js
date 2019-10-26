import { Router } from 'express'
import _ from 'lodash'
import { prisma } from '../../generated/prisma-client'
import { postLobbySchema } from './validation'

const router = new Router()

router.post('/', async ({body}, res, next) => {
  try {
   await postLobbySchema.validate(body, { abortEarly: false })
   const lobby = await prisma.createLobby({
     name: body.name
   })
   res.send(lobby)
  } catch(e) {
    next(e)
  }
})

router.use((err, _req, res, _next) => {
  console.error(err)
  if (err.name === 'ValidationError') {
    res.status(400).send({
      error: _.pick(err, ['errors'])
    })
  } else{
    res.sendStatus(500)
  }
})

export default router
