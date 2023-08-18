
const Joi = require("joi");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const userRepository = require('../repositories/accountRepository')

const { ApiError } = require('../models/ApiError');

const registerBodyValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ allowFullyQualified: true, allowUnicode: true }).required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9@$!%*?&]{4,}$')).required(),
  repeatPassword: Joi.ref('password'),
})

const registerUser = async (userData) => {
  const { error } = registerBodyValidator.validate(userData)

  if (error) {
    throw ApiError('Invalid request body', 400)
  }

  const isRegistered = await userRepository.findUserByEmail(userData.email)

  if (isRegistered) {
    throw ApiError('Email in use', 409)
  }

  //hash password
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(userData.password, salt);
  const uid = crypto.randomUUID()

  const registeredUser = await userRepository.createUser({ email: userData.email, passwordHash, salt, uid, name: userData.name });

  delete registeredUser.passwordHash
  delete registeredUser.salt

  return registeredUser
};

module.exports = {
  registerUser,
};