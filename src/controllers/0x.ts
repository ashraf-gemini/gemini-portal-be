import { Request, Response } from 'express'
import qs from 'querystring'

// ZEROX_API_KEY API key - ensure this is set in your environment variables
const ZEROX_API_KEY = process.env.ZEROX_API_KEY

// Handler to get swap price
export const getSwapPrice = async (req: Request, res: Response) => {
  const { network, ...rest } = req.query

  const params = qs.stringify({ ...rest } as qs.ParsedUrlQueryInput)
  const url = `https://${network ? `${network}.` : ''}api.0x.org/swap/v1/price?${params}`

  try {
    const response = await fetch(url, {
      headers: {
        '0x-api-key': ZEROX_API_KEY,
      },
    })

    const data = await response.json()
    if (!response.ok) {
      return res.status(res.statusCode).json(data)
    }
    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching swap price:', error)
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' })
  }
}

// Handler to get swap quote
export const getSwapQuote = async (req: Request, res: Response) => {
  const { network, ...rest } = req.query

  const params = qs.stringify({ ...rest } as qs.ParsedUrlQueryInput)
  const url = `https://${network ? `${network}.` : ''}api.0x.org/swap/v1/quote?${params}`

  try {
    const response = await fetch(url, {
      headers: {
        '0x-api-key': ZEROX_API_KEY,
      },
    })

    const data = await response.json()
    if (!response.ok) {
      return res.status(res.statusCode).json(data)
    }

    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching swap quote:', error)
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' })
  }
}
