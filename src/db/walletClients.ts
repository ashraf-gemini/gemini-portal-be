// db/walletClients.js

import { SCHEMA_NAMES } from '../contants'
import mongoose from 'mongoose'

const walletClientSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
  },
  backupStatus: {
    type: String,
  },
  clientApiKey: {
    type: String,
  },
  signingStatus: {
    type: String,
  },
  userId: {
    type: String,
  },
  isAccountAbstracted: {
    type: Boolean,
  },
  walletName: {
    type: String,
  },
})

export const WalletClientModel = mongoose.model(SCHEMA_NAMES.WALLET_CLIENT, walletClientSchema)
