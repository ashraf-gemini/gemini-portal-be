// routes/custodianBackupShare.ts
import { handleBackupWebhook, handleRecoveryWebhook } from '../controllers/custodianBackupShare'
import express from 'express'

const router = express.Router()

export default (router: express.Router) => {
  router.post('/webhook/backup', handleBackupWebhook)
  router.post('/webhook/backup/fetch', handleRecoveryWebhook)
}
