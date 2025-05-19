import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

/**
* @swagger
* /users/register:
*   post:
*     summary: Registra um novo usuário
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               username:
*                 type: string
*                 description: Nome de usuário do novo usuário.
*                 example: johndoe
*               password:
*                 type: string
*                 description: Senha do novo usuário.
*                 example: password123
*               email:
*                 type: string
*                 description: Email do novo usuário.
*                 example: johndoe@example.com
*     responses:
*       200:
*         description: Usuário registrado com sucesso.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Usuário registrado com sucesso.
*       400:
*         description: Requisição inválida. Nome de usuário, senha e email são obrigatórios.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 code:
*                   type: string
*                   example: Register_Bad_Request
*                 message:
*                   type: string
*                   example: Username, password and email required
*/
router.post('/register', userController.register);
router.post('/login', userController.login);

export default router;