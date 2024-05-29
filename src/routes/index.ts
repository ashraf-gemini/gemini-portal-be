import express from 'express'
import usersRouter from './users'
import alchemyRouter from './alchemy'
import walletClientsRouter from './walletClients'
import userBackupSharesRouter from './userBackupShares'
import custodianBackupShareRouter from './custodianBackupShare'
import zeroXRouter from './0x'
import infuraRouter from './infura'
const router = express.Router()

export default (): express.Router => {
  usersRouter(router)
  walletClientsRouter(router)
  userBackupSharesRouter(router)
  custodianBackupShareRouter(router)
  alchemyRouter(router)
  zeroXRouter(router)
  infuraRouter(router)
  return router
}
