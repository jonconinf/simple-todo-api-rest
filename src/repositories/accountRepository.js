const { ApiError } = require('../models/ApiError');
const UserModel = require('../models/User');

const createUser = async ({ email, passwordHash, salt, uid, name }) => {
  try {
    const newUser = await UserModel.create({ email, passwordHash, salt, uid, name, createdAt: new Date() });
    const leanUser = newUser.toObject({ virtuals: true });

    return leanUser;
  } catch (error) {
    throw ApiError(error.toString(), 500);
  }
};

const findUserByEmail = async (email) => {
  try {
    const foundUser = await UserModel.findOne({ email }).lean();
    return foundUser;
  } catch (error) {
    throw ApiError(error.toString(), 500);
  }
};

const findUserByUid = async (userUid) => {
  try {
    const foundUser = await UserModel.findOne({ uid: userUid }).lean();
    return foundUser;
  } catch (error) {
    throw ApiError(error.toString(), 500);
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByUid,
};