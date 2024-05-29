// routes/alchemy.ts

import express from 'express'
import { getSuggestedFeeData } from '../controllers/infura'

export default (router: express.Router) => {
  router.get('/infura/suggested-gas-fees', getSuggestedFeeData)
}
