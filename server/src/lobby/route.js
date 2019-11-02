import { Router } from 'express'
import _ from 'lodash'
import { prisma } from '../../generated/prisma-client'
import { postLobbySchema } from './validation'
import * as prismaService from './service'

const router = new Router()

const wrapHandler = func => (req, res, next) => {
  Promise.resolve()
    .then(func(req, res, next))
    .catch(next)
}

router.get(
  '/',
  wrapHandler(async (req, res) => {
    const lobbies = await prisma.lobbies()
    res.send(lobbies)
  })
)

router.post(
  '/',
  wrapHandler(async ({ body }, res) => {
    await postLobbySchema.validate(body)
    const lobby = await prismaService.createLobby(body.name, body.password)
    res.send(lobby)
  })
)

router.delete(
  '/:id',
  wrapHandler(async ({ params: { id } }, res) => {
    await prismaService.deleteLobby(id)
    res.sendStatus(200)
  })
)

// validation error
router.use((err, req, res, next) => {
  console.log(err.name)
  if (err.name === 'ValidationError') {
    res.status(400).send({
      error: _.pick(err, ['message'])
    })
  } else if (err.name === 'PrismaError') {
    const code = _.get(err, 'result.errors[0].code')
    console.log('TCL: code', code)
    switch (code) {
      case 3039:
        res.status(404).send({
          error: {
            message: 'Lobby not found'
          }
        })
        break
      default:
        res.status(500).send({ err })
    }
  } else {
    res.status(500).send({ err })
  }
})

export default router
