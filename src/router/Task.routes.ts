import express from 'express'
import {
  createTask,
  deleteTask,
  listTaskById,
  listTasks,
  updateTask
} from '../controller/TasksController'
import { registerTaskValidation } from '../services/TaskValidation'

const router = express.Router()

router.route('/register').post(registerTaskValidation, createTask)
router.route('/list').get(listTasks)
router.route('/list/:id').get(listTaskById)
router.route('/update/:id').put(updateTask)
router.route('/delete/:id').delete(deleteTask)

export default router
