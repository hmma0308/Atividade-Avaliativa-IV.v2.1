import taskService from '../services/task.services.js';

const createTask = async (req, res) => {
    try {
        const task = await taskService.createTask({
            ...req.body,
            userId: req.userId
        });
        res.status(201).json(task);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: 'Error creating task' });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllUserTasks(req.userId);
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};

const getTaskById = async (req, res) => {
    try {
        const taskId = parseInt(req.params.id, 10);
        if (isNaN(taskId)) {
            return res.status(400).json({ message: 'Task ID must be a number' });
        }

        const task = await taskService.getUserTask(req.userId, taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).json({ message: 'Error fetching task' });
    }
};

const updateTask = async (req, res) => {
    try {
        const taskId = parseInt(req.params.id, 10);
        if (isNaN(taskId)) {
            return res.status(400).json({ message: 'Task ID must be a number' });
        }

        const updatedTask = await taskService.updateUserTask(
            req.userId,
            taskId,
            req.body
        );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: 'Error updating task' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = parseInt(req.params.id, 10);
        if (isNaN(taskId)) {
            return res.status(400).json({ message: 'Task ID must be a number' });
        }

        const success = await taskService.deleteUserTask(req.userId, taskId);
        if (!success) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: 'Error deleting task' });
    }
};

export default {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};