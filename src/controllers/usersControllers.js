const usersServices = require('../services/usersServices');

const insertUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await usersServices.insertUserService(name, email, password);
    return res.status(201).json({ user: result });
  } catch (error) {
    console.log('insertUser controller error:', error);
  }
};

const insertAdminUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await usersServices.insertAdminUser(name, email, password);
    return res.status(201).json({ user: result });
  } catch (error) {
    console.log('insertAdminUser controller error:', error);
  }
};

module.exports = {
  insertUser,
  insertAdminUser,
};
