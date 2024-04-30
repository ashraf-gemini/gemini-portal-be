import { SCHEMA_NAMES } from '../contants'
import mongoose from 'mongoose'

const custodianBackupShareSchema = new mongoose.Schema({
  backupMethod: {
    type: String,
    default: 'UNKNOWN',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  share: String,
  walletClientId: String,
})

export const CustodianBackupShareModel = mongoose.model(
  SCHEMA_NAMES.CUSTODIAN_BACKUP_SHARE,
  custodianBackupShareSchema,
)
