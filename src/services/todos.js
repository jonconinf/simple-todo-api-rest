
const Crypto = require('crypto');
const Joi = require('joi');
const todoRepository = require('../repositories/todoRepository')

const { ApiError } = require("../models/ApiError");
const userRepository = require('../repositories/accountRepository');

const createTodoBodyValidator = Joi.object({
    content: Joi.string().required(),
})

const updateTodoBodyValidator = Joi.object({
    content: Joi.string(),
    completed: Joi.bool()
}).required()

async function createTodo(userUid, todoData) {
    const { error } = createTodoBodyValidator.validate(todoData)

    if (error) {
        throw ApiError('Invalid request body', 400)
    }

    const user = userRepository.findUserByUid(userUid)

    if (!user) {
        throw ApiError('Invalid user', 400)
    }

    const todo = {
        uid: Crypto.randomUUID(),
        userUid: userUid,
        content: todoData.content,
        completed: false,
        completedAt: null,
        createdAt: new Date()
    }

    try {
        const todos = await todoRepository.createTodo(todo)
        return todos
    } catch (error) {
        throw ApiError(error.message, error.code)
    }
}

async function getUserTodos(userUid) {
    try {
        const todos = await todoRepository.getUserTodos(userUid)
        return todos
    } catch (error) {
        throw ApiError(error.message, error.code)
    }
}

async function deleteTodo(userUid, todoId) {
    const user = userRepository.findUserByUid(userUid)
    if (!user) {
        throw ApiError('Invalid user', 400)
    }

    const todo = await todoRepository.findTodoById(todoId)
    if (!todo) {
        throw ApiError('Todo not found', 404)
    }

    if (todo.userUid !== userUid) {
        throw ApiError('You can´t delete this todo', 404)
    }

    try {
        await todoRepository.deleteTodo(todoId)
    } catch (error) {
        throw ApiError(error.message, error.code)
    }
}

async function updateTodo(userUid, todoId, todoData) {
    const { error } = updateTodoBodyValidator.validate(todoData)

    if (error) {
        throw ApiError('Invalid request body', 400)
    }

    const user = userRepository.findUserByUid(userUid)

    if (!user) {
        throw ApiError('Invalid user', 400)
    }

    const todo = await todoRepository.findTodoById(todoId)
    if (!todo) {
        throw ApiError('Todo not found', 404)
    }

    if (todo.userUid !== userUid) {
        throw ApiError('You can´t delete this todo', 404)
    }


    const newTodo = {
        content: todoData.content ?? todo.content,
        completed: todoData.completed ?? todo.completed,
        completedAt: todoData.completed === true ? new Date() : null,
    }

    try {
        const updatedTodo = await todoRepository.updateTodo(todoId, newTodo)
        return updatedTodo
    } catch (error) {
        throw ApiError(error.message, error.code)
    }
}

module.exports = {
    getUserTodos,
    createTodo,
    deleteTodo,
    updateTodo
}