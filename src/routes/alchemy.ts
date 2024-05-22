// routes/alchemy.ts

import express from 'express'
import { getAssetTransfers, getTokenMetadata } from '../controllers/alchemy'

export default (router: express.Router) => {
  router.get('/transactions/:network/:address', getAssetTransfers)
  router.get('/tokenMetaData/:network/:contractAddress', getTokenMetadata)
}
