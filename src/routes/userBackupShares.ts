// routes/userBackupShares.ts

import express from 'express'
import { createUserBackupShare, getUserBackupShares } from '../controllers/userBackupShares'

export default (router: express.Router) => {
  router.post('/user-backup-shares/:walletClientId', createUserBackupShare)
  router.get('/user-backup-shares/:walletClientId', getUserBackupShares)
}
