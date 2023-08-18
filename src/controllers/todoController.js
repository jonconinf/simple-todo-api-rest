const services = require("../services/index")


const createTodo = async (req, res) => {
  try {
    const userUid = req.userUid;
    const todoData = req.body;

    const todos = await services.todos.createTodo(userUid, todoData);
    res.status(201).json({ ...todos });
  } catch (error) {
    console.log(error)
    res.status(error.code).json({ error });
  }
};

const getUserTodos = async (req, res) => {
  try {
    const userUid = req.userUid;
    const todos = await services.todos.getUserTodos(userUid);
    res.status(201).json({ todos });
  } catch (error) {
    console.log(error)
    res.status(error.code).json({ error });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const userUid = req.userUid;
    const { todoId } = req.params;
    await services.todos.deleteTodo(userUid, todoId);
    res.status(204).json();
  } catch (error) {
    console.log(error)
    res.status(error.code).json({ error });
  }
};

const updateTodo = async (req, res) => {
  try {
    const userUid = req.userUid;
    const { todoId } = req.params;
    const todoData = req.body;
    const updatedTodo = await services.todos.updateTodo(userUid, todoId, todoData);
    res.status(200).json({ ...updatedTodo });
  } catch (error) {
    console.log(error)
    res.status(error.code).json({ error });
  }
};

module.exports = {
  getUserTodos,
  createTodo,
  deleteTodo,
  updateTodo
};