import { BackupMethod } from './types'

// Utility function to notify Portal about storing the client backup share
const notifyPortalAboutBackupShare = async (backupMethod: string, success: boolean) => {
  try {
    const portalUrl = 'https://api.portalhq.io/api/v1/clients/me/wallet/stored-client-backup-share'
    const portalRequestBody = {
      backupMethod,
      success: success,
    }

    const portalResponse = await fetch(portalUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${process.env.PORTAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(portalRequestBody),
    })

    // Check if the notification to Portal was successful
    if (!portalResponse.ok) {
      throw new Error('Failed to notify Portal about storing client backup share')
    }

    return true // Notification successful
  } catch (error) {
    console.error(error)
    return false // Notification failed
  }
}

export default notifyPortalAboutBackupShare

// Function to fetch additional client details from the PORTAL API
export const fetchClientDetails = async (clientId: string) => {
  try {
    const response = await fetch(`https://api.portalhq.io/api/v1/custodians/clients/${clientId}`, {
      headers: {
        Authorization: `Bearer ${process.env.PORTAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch client details')
    }

    return await response.json()
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch client details')
  }
}

// Utility function to check if the backup method is valid
export const isValidBackupMethod = (method: string): method is BackupMethod => {
  return ['ICLOUD', 'GDRIVE', 'PASSKEY', 'PASSWORD'].includes(method)
}
