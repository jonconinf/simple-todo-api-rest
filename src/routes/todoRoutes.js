const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, todoController.createTodo);
router.get('/', authMiddleware, todoController.getUserTodos);
router.delete('/:todoId', authMiddleware, todoController.deleteTodo);
router.patch('/:todoId', authMiddleware, todoController.updateTodo);

module.exports = router;