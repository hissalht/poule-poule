import express from 'express'

import configure from './configure'
import lobbyRouter from './lobby/route'

const app = express()

configure(app)

app.use('/lobbies', lobbyRouter)

export default app
