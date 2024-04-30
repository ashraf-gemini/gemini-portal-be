// routes/users.ts

import express from 'express'
import {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
  createBulkUsers,
} from '../controllers/users'

export default (router: express.Router) => {
  router.get('/users', getUsers)
  router.get('/users/:userId', getUserById)
  router.post('/users', createUser)
  router.delete('/users/:userId', deleteUserById)
  router.post('/users/createBulkUsers', createBulkUsers)
}
