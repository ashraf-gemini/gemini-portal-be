import { Request, Response } from 'express'

// Alchemy API key - ensure this is set in your environment variables
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY

// Handler to get asset transfers
export const getAssetTransfers = async (req: Request, res: Response) => {
  const { network, address } = req.params

  const params = {
    fromBlock: '0x0',
    toBlock: 'latest',
    withMetadata: false,
    excludeZeroValue: false,
    maxCount: '0x3e8',
    category: ['external', 'internal', 'erc20', 'erc721', 'erc1155'],
  }

  const defaultData = {
    id: 1,
    jsonrpc: '2.0',
    method: 'alchemy_getAssetTransfers',
  }

  const toPayload = { ...defaultData, params: [{ ...params, toAddress: address }] }
  const fromPayload = { ...defaultData, params: [{ ...params, fromAddress: address }] }

  const url = `https://${network}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`

  try {
    const [incomingResponse, outgoingResponse] = await Promise.all([
      fetch(url, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(toPayload),
      }),
      fetch(url, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(fromPayload),
      }),
    ])

    if (!incomingResponse.ok || !outgoingResponse.ok) {
      throw new Error('Failed to fetch asset transfers')
    }

    const incomingData = await incomingResponse.json()
    const outgoingData = await outgoingResponse.json()

    const incomingTransfers = incomingData.result.transfers
    const outgoingTransfers = outgoingData.result.transfers

    res.status(200).json([...incomingTransfers, ...outgoingTransfers])
  } catch (error) {
    console.error('Error fetching asset transfers:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
// Handler to get token metadata
export const getTokenMetadata = async (req: Request, res: Response) => {
  const { network, contractAddress } = req.params

  const payload = {
    id: 1,
    jsonrpc: '2.0',
    method: 'alchemy_getTokenMetadata',
    params: [contractAddress],
  }

  const url = `https://${network}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch token metadata')
    }

    const data = await response.json()

    res.status(200).json(data.result)
  } catch (error) {
    console.error('Error fetching token metadata:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
