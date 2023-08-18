const { ApiError } = require('../models/ApiError');
const TodoModel = require('../models/Todo');

const findTodoById = async (todoId) => {
  try {
    const todo = await TodoModel.findOne({ uid: todoId }).lean();
    return todo;
  } catch (error) {
    throw ApiError(error.toString(), 500);
  }
};

const createTodo = async (todo) => {
  try {
    const createdTodo = await TodoModel.create({ ...todo });
    const leanTodo = createdTodo.toObject({ virtuals: true })
    return leanTodo;
  } catch (error) {
    throw ApiError(error.toString(), 500);
  }
};

const getUserTodos = async (userUid) => {
  try {
    const todos = await TodoModel.find({ userUid }).lean();
    return todos
  } catch (error) {
    throw ApiError(error.toString(), 500);
  }
};

const deleteTodo = async (todoId) => {
  try {
    await TodoModel.findOneAndDelete({ uid: todoId });
  } catch (error) {
    throw ApiError(error.toString(), 500);
  }
};

const updateTodo = async (todoId, newTodo) => {
  try {
    const updatedTodo = await TodoModel.findOneAndUpdate({ uid: todoId }, newTodo, { new: true });
    const leanTodo = updatedTodo.toObject({ virtuals: true })

    return leanTodo
  } catch (error) {
    throw ApiError(error.toString(), 500);
  }
};

module.exports = {
  findTodoById,
  createTodo,
  getUserTodos,
  deleteTodo,
  updateTodo
};