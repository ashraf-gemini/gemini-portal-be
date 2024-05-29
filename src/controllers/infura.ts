import { Request, Response } from 'express'

// INFURA_API_KEY and API_KEY_SECRET - ensure these are set in your environment variables
const INFURA_API_KEY = process.env.INFURA_API_KEY
const API_KEY_SECRET = process.env.INFURA_API_KEY_SECRET

const Auth = Buffer.from(INFURA_API_KEY + ':' + API_KEY_SECRET).toString('base64')

// Handler to get suggested gas fee Data
export const getSuggestedFeeData = async (req: Request, res: Response) => {
  const { chainId } = req.query

  if (!chainId) {
    res.status(400).send({ error: 'Chain ID is required' })
    return
  }

  try {
    const response = await fetch(`https://gas.api.infura.io/networks/${chainId}/suggestedGasFees`, {
      headers: {
        Authorization: `Basic ${Auth}`,
      },
    })
    if (!response.ok) {
      throw new Error('Error fetching fee data')
    }
    const data = await response.json()
    res.status(200).send(data)
  } catch (error) {
    res.status(500).send({ error: 'Error fetching fee data' })
  }
}
