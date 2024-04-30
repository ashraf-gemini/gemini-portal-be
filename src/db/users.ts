// db/users.js

import { SCHEMA_NAMES } from '../contants'
import mongoose from 'mongoose'

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  walletClients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: SCHEMA_NAMES.WALLET_CLIENT,
    },
  ],
  name: {
    type: String,
    required: true,
  },
})

// Create the User model
export const UserModel = mongoose.model(SCHEMA_NAMES.USER, userSchema)
