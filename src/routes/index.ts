import express from 'express'
import usersRouter from './users'
import walletClientsRouter from './walletClients'
const router = express.Router()

export default (): express.Router => {
  usersRouter(router)
  walletClientsRouter(router)
  return router
}
