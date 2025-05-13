import express from 'express';
import taskController from '../controllers/task.controller.js';
import verifyToken from '../middlewares/jwt.token.middleware.js';

const router = express.Router();

router.post('/', verifyToken, taskController.createTask);
router.get('/', verifyToken, taskController.getAllTasks);
router.get('/:id', verifyToken, taskController.getTaskById);
router.put('/:id', verifyToken, taskController.updateTask);
router.patch('/:id', verifyToken, taskController.updateTask);
router.delete('/:id', verifyToken, taskController.deleteTask);

export default router;