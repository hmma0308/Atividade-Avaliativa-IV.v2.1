import db from '../models/index.js';

const createTask = async (taskData) => {
    return await db.tasks.create(taskData);
};

const getAllUserTasks = async (userId) => {
    return await db.tasks.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']]
    });
};

const getUserTask = async (userId, taskId) => {
    return await db.tasks.findOne({
        where: {
            id: taskId,
            userId: userId
        }
    });
};

const updateUserTask = async (userId, taskId, updateData) => {
    const task = await db.tasks.findOne({
        where: {
            id: taskId,
            userId: userId
        }
    });

    if (!task) return null;

    return await task.update(updateData);
};

const deleteUserTask = async (userId, taskId) => {
    const task = await db.tasks.findOne({
        where: {
            id: taskId,
            userId: userId
        }
    });

    if (!task) return false;

    await task.destroy();
    return true;
};

export default {
    createTask,
    getAllUserTasks,
    getUserTask,
    updateUserTask,
    deleteUserTask
};