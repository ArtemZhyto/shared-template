// Modules
import { createServer } from 'node:http'

// App
import app from './app'

// Configs
import { appConfig } from '@configs/index'

const httpServer = createServer(app)

httpServer.listen(appConfig.port, () => {
  console.log(`Server started on :${appConfig.port}`)
})
