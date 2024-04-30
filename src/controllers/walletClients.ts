// controllers/walletClients.ts

import { Request, Response } from 'express'
import { WalletClientModel } from '../db/walletClients'
import { UserModel } from '../db/users'

interface ClientResponse {
  id: string
  clientApiKey: string
  clientSessionToken: string
  isAccountAbstracted: boolean
}

export const createWalletClient = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const user = await UserModel.findOne({ id: userId })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

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

    const responseData: ClientResponse = await response.json()

    const newClient = new WalletClientModel({ ...responseData, userId })
    await newClient.save()

    user.walletClients.push(newClient._id)
    await user.save()

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
