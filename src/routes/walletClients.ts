// routes/walletClients.ts

import express from 'express'
import {
  createWalletClient,
  getWalletClientById,
  getWalletClients,
  refreshClientSessionToken,
} from '../controllers/walletClients'

export default (router: express.Router) => {
  router.post('/users/:userId/wallet-clients', createWalletClient)
  router.get('/wallet-clients/:clientId', getWalletClientById)
  router.get('/users/:userId/wallet-clients', getWalletClients)
  router.post('/wallet-clients/:clientId/session', refreshClientSessionToken)
}
