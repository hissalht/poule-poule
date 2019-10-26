import express from 'express'

import configure from './configure'
import indexRouter from './routes/index'

const app = express()

configure(app)

app.use('/', indexRouter)

export default app
