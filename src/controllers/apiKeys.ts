import { Request, Response } from 'express'

export const getAPIKeys = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      PORTAL_API_KEY: process.env.PORTAL_API_KEY,
      ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
      ZEROX_API_KEY: process.env.ZEROX_API_KEY,
      INFURA_API_KEY: process.env.INFURA_API_KEY,
      INFURA_API_KEY_SECRET: process.env.INFURA_API_KEY_SECRET,
    })
  } catch (error) {
    console.error('Error fetching swap price:', error)
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' })
  }
}
