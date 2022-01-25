const usersModel = require('../model/usersModel');

const insertUserService = async (name, email, password) => {
  try {
    const result = await usersModel.insertUser(name, email, password);

    return result;
  } catch (error) {
    console.log('insertUserService', error);
  }
};

const insertAdminUser = async (name, email, password) => {
  try {
    const result = await usersModel.insertAdminUser(name, email, password);

    return result;
  } catch (error) {
    console.log('insertAdminUser', error);
  }
};

module.exports = {
  insertUserService,
  insertAdminUser,
};
