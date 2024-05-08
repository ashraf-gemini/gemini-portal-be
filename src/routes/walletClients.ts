// routes/walletClients.ts

import express from 'express'
import {
  createWalletClient,
  getWalletClientById,
  getWalletClients,
  refreshClientSessionToken,
  updateWalletClient,
} from '../controllers/walletClients'

export default (router: express.Router) => {
  router.post('/wallet-client', createWalletClient)
  router.get('/wallet-clients/:clientId', getWalletClientById)
  router.get('/wallet-clients/user/:userId', getWalletClients)
  router.post('/wallet-clients/:clientId/session', refreshClientSessionToken)
  router.patch('/wallet-clients/:clientId', updateWalletClient)
}
