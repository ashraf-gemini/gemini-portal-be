// controllers/webhookController.ts

import { isValidBackupMethod } from '../utils'
import { CustodianBackupShareModel } from '../db/custodianBackupShares'
import { Request, Response } from 'express'

export const handleBackupWebhook = async (req: Request, res: Response) => {
  try {
    // Validate X-Webhook-Secret header - just the existence for now
    const webhookSecret = req.headers['x-webhook-secret']
    if (!webhookSecret) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    // Extract data from the request body
    const { backupMethod, clientId, share } = req.body

    if (isValidBackupMethod(backupMethod)) {
      return res.status(400).json({ error: 'Invalid backup method' })
    }

    // Validate share (Assuming it's a JSON string)
    let parsedShare
    try {
      parsedShare = JSON.parse(share)
    } catch (error) {
      return res.status(400).json({ error: 'Invalid share format' })
    }

    // Store the custodian backup share in the database
    const newBackupShare = new CustodianBackupShareModel({
      backupMethod,
      walletClientId: clientId,
      share: parsedShare,
    })
    await newBackupShare.save()

    // Return 200 status code
    return res.status(200).send()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const handleRecoveryWebhook = async (req: Request, res: Response) => {
  try {
    // Validate X-Webhook-Secret header - just the existence for now
    const webhookSecret = req.headers['x-webhook-secret']
    if (!webhookSecret) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    // Extract clientId from request body
    const { clientId } = req.body

    // Obtain all custodian backup shares for the client
    const custodianBackupShares = await CustodianBackupShareModel.find({ walletClientId: clientId })

    // Extract the raw share strings
    const rawShares = custodianBackupShares.map((custodianBackupShare) => {
      return custodianBackupShare.share
    })

    // Return 200 status code along with the backupShares in the response body
    return res.status(200).json({ backupShares: rawShares })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
