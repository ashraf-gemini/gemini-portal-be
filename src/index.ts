import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './routes'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

const app = express()

app.use(
  cors({
    credentials: true,
  }),
)
app.use(bodyParser.json())
app.use(cookieParser())
app.use(compression())

const server = http.createServer(app)
const port = process.env.PORT || 8080
server.listen(port, () => {
  console.log('Server is running on port ' + port)
})

const MONGO_URL = process.env.DATABASE_URL

mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (error) => {
  console.log('MongoDB Connection Error: ', error)
  process.exit()
})

app.use('/', router())
