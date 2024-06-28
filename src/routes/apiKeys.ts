// routes/alchemy.ts

import express from 'express'
import { getAPIKeys } from '../controllers/apiKeys'

export default (router: express.Router) => {
  router.get('/api-keys', getAPIKeys)
}
