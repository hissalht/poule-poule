import { Router } from 'express'
import prisma from '../utils/prisma'

const router = Router()

router.get('/lobbies', async (_, res) => {
  const lobbies = await prisma.lobbies()
  res.send(lobbies)
})

router.post('/lobbies', async ({body}, res) => {
  const lobby = await prisma.createLobby({name: body.name})
  console.log(lobby)
  res.send(lobby)
})

export default router
