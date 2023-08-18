const services = require("../services/index")

const register = async (req, res) => {
  try {
    const userData = req.body;
    const registeredUser = await services.register.registerUser(userData);
    res.status(201).json({ ...registeredUser });
  } catch (error) {
    console.log(error)
    res.status(error.code).json({ error });
  }
};

const login = async (req, res) => {
  try {
    const userData = req.body;
    const user = await services.login.login(userData);
    res.status(200).json({ ...user });
  } catch (error) {
    console.log(error)
    res.status(error.code).json({ error });
  }
};

module.exports = {
  register,
  login,
};