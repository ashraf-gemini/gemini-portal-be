// controllers/userBackupShares.ts

import { Request, Response } from 'express'
import { UserBackupShareModel } from '../db/userBackupShares'
import { UserModel } from '../db/users'
import notifyPortalAboutBackupShare, { isValidBackupMethod } from '../utils'

// Controller to create user backup shares
export const createUserBackupShare = async (req: Request, res: Response) => {
  const { walletClientId } = req.params
  const { cipherText, backupMethod } = req.body

  try {
    // Check if the user associated with the walletClientId exists
    const user = await UserModel.findOne({ walletClients: { $in: [walletClientId] } })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    } // Check if the backup method is valid
    if (!isValidBackupMethod(backupMethod)) {
      return res.status(400).json({ error: 'Invalid backup method' })
    }

    // Create a new user backup share document
    const newUserBackupShare = new UserBackupShareModel({
      cipherText,
      backupMethod,
      walletClientId,
    })

    // Save the new user backup share to the database
    const savedUserBackupShare = await newUserBackupShare.save()
    const portalNotificationSuccessful = await notifyPortalAboutBackupShare(backupMethod, true)
    if (!portalNotificationSuccessful) {
      throw new Error('Failed to notify Portal about storing client backup share')
    }

    // Respond with 201 status and the created user backup share data
    res.status(201).json(savedUserBackupShare)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Controller to get user backup shares by walletClientId
export const getUserBackupShares = async (req: Request, res: Response) => {
  const { walletClientId } = req.params

  try {
    // Check if the user associated with the walletClientId exists
    const user = await UserModel.findOne({ walletClients: { $in: [walletClientId] } })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Find all user backup shares associated with the walletClientId
    const userBackupShares = await UserBackupShareModel.find({ walletClientId })

    // Respond with 200 status and the user backup shares
    res.status(200).json(userBackupShares)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
