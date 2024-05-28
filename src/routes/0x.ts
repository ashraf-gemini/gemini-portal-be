// routes/alchemy.ts

import express from 'express'
import { getSwapPrice, getSwapQuote } from '../controllers/0x'

export default (router: express.Router) => {
  router.get('/0x/swap-price', getSwapPrice)
  router.get('/0x/swap-quote', getSwapQuote)
}
