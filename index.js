import express from 'express'
import { connectDb } from './db/helpers.js'
import logger from './lib/logger.js'
import router from './config/router.js'
import { port } from './config/environment.js'
import errorHandler from './lib/errorHandler.js'

// const dbURI = 'mongodb://localhost/brands-db'
//rename my-api-db part
const app = express()


app.use(express.json())
app.use('/', logger)
app.use('/api', router)
app.use(errorHandler)
//adding it to middleware section

async function startServer() {
  try {
    await connectDb()
    console.log('🤖 Database has connected')
    app.listen(port, () => console.log(`🤖 Up and running on port ${port}`))
  } catch (err) {
    console.log('🤖 Something went wrong starting the App')
    console.log(err)
  }
}

startServer()


