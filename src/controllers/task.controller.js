import taskService from '../services/task.services.js';

const createTask = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const taskData = {
            ...req.body,
            userId: req.userId
        };

        const task = await taskService.createTask(taskData);
        console.log(`Task created: ${task.id} by user: ${req.userId}`);
        res.status(201).json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Error creating task' });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllUserTasks(req.userId);
        console.log(`Retrieved ${tasks.length} tasks for user: ${req.userId}`);
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error getting tasks:', error);
        res.status(500).json({ message: 'Error getting tasks' });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await taskService.getUserTask(req.userId, req.params.id);
        
        if (!task) {
            console.log(`Task not found: ${req.params.id} for user: ${req.userId}`);
            return res.status(404).json({ message: 'Task not found' });
        }

        console.log(`Retrieved task: ${task.id} for user: ${req.userId}`);
        res.status(200).json(task);
    } catch (error) {
        console.error('Error getting task:', error);
        res.status(500).json({ message: 'Error getting task' });
    }
};

const updateTask = async (req, res) => {
    try {
        const updatedTask = await taskService.updateUserTask(
            req.userId, 
            req.params.id, 
            req.body
        );

        if (!updatedTask) {
            console.log(`Task not found for update: ${req.params.id} for user: ${req.userId}`);
            return res.status(404).json({ message: 'Task not found' });
        }

        console.log(`Updated task: ${updatedTask.id} for user: ${req.userId}`);
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Error updating task' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const deleted = await taskService.deleteUserTask(req.userId, req.params.id);
        
        if (!deleted) {
            console.log(`Task not found for deletion: ${req.params.id} for user: ${req.userId}`);
            return res.status(404).json({ message: 'Task not found' });
        }

        console.log(`Deleted task: ${req.params.id} for user: ${req.userId}`);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting task:', error);
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