// controllers/walletClients.ts

import { Request, Response } from 'express'
import { WalletClientModel } from '../db/walletClients'
import { UserModel } from '../db/users'
import { fetchClientDetails } from '../utils'

interface ClientResponse {
  id: string
  clientApiKey: string
  clientSessionToken: string
  isAccountAbstracted: boolean
}

export const createWalletClient = async (req: Request, res: Response) => {
  const { userId, walletName, isAccountAbstracted, userName } = req.body
  try {
    // Check if any required fields are missing
    const requiredFields = ['userId', 'walletName', 'isAccountAbstracted']
    const missingFields = requiredFields.filter((field) => !Object.keys(req.body).includes(field))
    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` })
    }
    let user = await UserModel.findOne({ id: userId })
    try {
      if (!user) {
        // Create a new user document
        const newUser = new UserModel(
          JSON.parse(
            JSON.stringify({
              id: userId,
              name: userName,
            }),
          ),
        )

        // Save the new user document to the database
        await newUser.save()
      }
    } catch (error) {
      return res.status(400).json({ error: 'Error creating a new user!' })
    }
    user = await UserModel.findOne({ id: userId })

    // Check if a wallet with the same name already exists for the user
    const existingWallet = await WalletClientModel.findOne({ userId, walletName })
    if (existingWallet) {
      return res.status(400).json({ error: 'Wallet name already exists' })
    }

    // Make the initial API call to create the wallet client
    const response = await fetch('https://api.portalhq.io/api/v1/custodians/clients', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PORTAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    })

    if (!response.ok) {
      throw new Error('Failed to create wallet client')
    }

    // Parse the response data
    const responseData = await response.json()

    // Fetch additional details from PORTAL for completeness
    const clientDetails = await fetchClientDetails(responseData.id)

    // Create a new WalletClientModel instance with the additional details
    const newClient = new WalletClientModel({
      ...responseData,
      userId,
      ...clientDetails,
      walletName,
      isAccountAbstracted,
    })

    // Save the new client to the database
    await newClient.save()

    // Update the user's walletClients array with the new client's ID
    user.walletClients.push(newClient._id)
    await user.save()

    // Respond with the newly created client
    res.status(201).json(newClient)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getWalletClientById = async (req: Request, res: Response) => {
  try {
    const response = await fetch(
      `https://api.portalhq.io/api/v1/custodians/clients/${req.params.clientId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PORTAL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok) {
      throw new Error('Failed to fetch wallet client')
    }

    const responseData: ClientResponse = await response.json()
    res.status(200).json(responseData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getWalletClients = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ id: req.params.userId }).populate('walletClients')
    console.log('🚀 ~ getWalletClients ~ user:', user)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user.walletClients)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const refreshClientSessionToken = async (req: Request, res: Response) => {
  try {
    const response = await fetch(
      `https://api.portalhq.io/api/v1/custodians/clients/${req.params.clientId}/session`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.PORTAL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok) {
      throw new Error('Failed to refresh client session token')
    }

    const responseData: ClientResponse = await response.json()
    res.status(200).json(responseData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateWalletClient = async (req: Request, res: Response) => {
  const { clientId } = req.params

  try {
    // Check if any unsupported fields are provided
    const supportedFields = [
      'walletName',
      'isAccountAbstracted',
      'address',
      'backupStatus',
      'signingStatus',
    ]
    const unsupportedFields = Object.keys(req.body).filter(
      (field) => !supportedFields.includes(field),
    )
    if (unsupportedFields.length > 0) {
      return res
        .status(400)
        .json({ error: `Unsupported fields provided: ${unsupportedFields.join(', ')}` })
    }

    // Find the wallet client by ID
    const walletClient = await WalletClientModel.findOne({ id: clientId })
    if (!walletClient) {
      return res.status(404).json({ error: 'Wallet client not found' })
    }

    // Loop over the request body and update the wallet client with the new values
    Object.keys(req.body).forEach((field) => {
      supportedFields.includes(field)
      if (supportedFields.includes(field)) {
        ;(walletClient as any)[field] = req.body[field]
      }
    })

    // Save the updated wallet client to the database
    await walletClient.save()

    // Respond with the updated wallet client
    res.status(200).json(walletClient)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
