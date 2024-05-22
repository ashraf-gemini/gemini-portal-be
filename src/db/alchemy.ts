// db/alchemy.ts
import { SCHEMA_NAMES } from '../contants'
import mongoose, { Schema, Document } from 'mongoose'

interface ITokenMetadata extends Document {
  contractAddress: string
  name?: string
  symbol?: string
  decimals?: number
  logo?: string
}

const TokenMetadataSchema: Schema = new Schema({
  contractAddress: { type: String, required: true, unique: true },
  name: { type: String },
  symbol: { type: String },
  decimals: { type: Number },
  logo: { type: String },
})

export const TokenMetadataModel = mongoose.model<ITokenMetadata>(
  SCHEMA_NAMES.TOKEN_METADATA,
  TokenMetadataSchema,
)
