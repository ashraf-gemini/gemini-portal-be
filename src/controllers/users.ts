import { UserModel } from '../db/users'
import e from 'express'

export const getUsers = async (_: e.Request, res: e.Response) => {
  try {
    const users = await UserModel.find()
    console.log('users', users)
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// Controller to fetch user by userId
export const getUserById = async (req: e.Request, res: e.Response) => {
  const userId = req.params.userId // Extract userId from request parameters
  try {
    const user = await UserModel.findById(userId) // Find user by userId
    if (!user) {
      // If user is not found, return 404 status with error message
      return res.status(404).json({ message: 'User not found' })
    }
    // If user is found, return 200 status with user data
    res.status(200).json(user)
  } catch (error) {
    // If any error occurs during the process, return 500 status with error message
    res.status(500).json({ message: error.message })
  }
}

// Controller to create a new user
export const createUser = async (req: e.Request, res: e.Response) => {
  const { id, name } = req.body // Extract user data from request body
  try {
    // Create a new user document
    const newUser = new UserModel({
      id,
      name,
    })

    // Save the new user document to the database
    const savedUser = await newUser.save()

    // Respond with 201 status and the created user data
    res.status(201).json(savedUser)
  } catch (error) {
    // If any error occurs during the process, return 500 status with error message
    res.status(500).json({ message: error.message })
  }
}

// controllers/userController.js

// Controller to delete user by userId
export const deleteUserById = async (req: e.Request, res: e.Response) => {
  const userId = req.params.userId // Extract userId from request parameters
  try {
    // Find the user by userId and delete it
    const deletedUser = await UserModel.findByIdAndDelete(userId)
    if (!deletedUser) {
      // If user is not found, return 404 status with error message
      return res.status(404).json({ message: 'User not found' })
    }
    // If user is found and deleted, respond with 200 status and the deleted user data
    res.status(200).json(deletedUser)
  } catch (error) {
    // If any error occurs during the process, return 500 status with error message
    res.status(500).json({ message: error.message })
  }
}

// Controller to create bulk users

// POST /api/users/createBulkUsers
// Content-Type: application/json

// [
//   {
//     "id": "1",
//     "name": "John Doe"
//   },
//   {
//     "id": "2",
//     "name": "Jane Smith"
//   },
//   {
//     "id": "3",
//     "name": "Alice Johnson"
//   }
// ]
export const createBulkUsers = async (req: e.Request, res: e.Response) => {
  const usersData = req.body // Extract array of user data from request body
  try {
    // Create an array to store the created users
    const createdUsers = []

    // Iterate over the array of user data
    for (const userData of usersData) {
      // Create a new user document
      const newUser = new UserModel(userData)

      // Save the new user document to the database
      const savedUser = await newUser.save()

      // Push the created user to the array
      createdUsers.push(savedUser)
    }

    // Respond with 201 status and the array of created users
    res.status(201).json(createdUsers)
  } catch (error) {
    // If any error occurs during the process, return 500 status with error message
    res.status(500).json({ message: error.message })
  }
}
