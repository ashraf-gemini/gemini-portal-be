import express from 'express'
import usersRouter from './users'
import walletClientsRouter from './walletClients'
import userBackupSharesRouter from './userBackupShares'
import custodianBackupShareRouter from './custodianBackupShare'
const router = express.Router()

export default (): express.Router => {
  usersRouter(router)
  walletClientsRouter(router)
  userBackupSharesRouter(router)
  custodianBackupShareRouter(router)
  return router
}
