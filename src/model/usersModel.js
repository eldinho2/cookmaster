const connection = require('./connection');

const insertUser = async (name, email, password) => {
  try {
    const db = await connection();
    const insertedUser = await db.collection('users').insertOne(
      { name, email, password, role: 'user' },
    );

    const data = { name, email, role: 'user', _id: insertedUser.insertedId };
    return data;
  } catch (e) {
    console.log('insertUser MODEL', e);
  }
};

const insertAdminUser = async (name, email, password) => {
  try {
    const db = await connection();
    const insertedUser = await db.collection('users').insertOne(
      { name, email, password, role: 'admin' },
    );

    const data = { name, email, role: 'admin', _id: insertedUser.insertedId };
    return data;
  } catch (e) {
    console.log('insertUser MODEL', e);
  }
};

module.exports = {
  insertUser,
  insertAdminUser,
};
