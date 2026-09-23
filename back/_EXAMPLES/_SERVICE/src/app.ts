// Modules
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

// Configs
import { corsOptions, env, helmetOptions } from '@configs/index'

// Router
import router from '@routes/router'

const app = express()

app.set('trust proxy', 1)

app.use(cors(corsOptions))
app.use(cookieParser(env.cookiesSecret))
app.use(helmet(helmetOptions))

app.use(
  express.json({
    limit: '10kb',
  }),
)

app.use(
  express.urlencoded({
    extended: true,
    limit: '10kb',
  }),
)

app.use('/', router)

export default app
