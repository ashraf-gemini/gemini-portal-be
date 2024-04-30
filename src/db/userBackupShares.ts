// db/userBackupShares.ts

import { SCHEMA_NAMES } from '../contants'
import mongoose from 'mongoose'

// Define the schema for the UserBackupShare model
const userBackupShareSchema = new mongoose.Schema({
  backupMethod: {
    type: String,
    default: 'UNKNOWN',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  id: {
    type: String,
    unique: true,
    default: () => Math.random().toString(36).substr(2, 9), // Generate a random string for id
  },
  cipherText: String,
  walletClientId: String,
})

// Create the UserBackupShare model
export const UserBackupShareModel = mongoose.model(
  SCHEMA_NAMES.USER_BACKUP_SHARE,
  userBackupShareSchema,
)
