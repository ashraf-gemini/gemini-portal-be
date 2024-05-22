// routes/alchemy.ts

import express from 'express'
import { getAssetTransfers } from '../controllers/alchemy'

export default (router: express.Router) => {
  router.get('/transactions/:network/:address', getAssetTransfers)
}
