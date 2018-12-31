const jwt = require('jsonwebtoken');

const userValidation = (req, res, next) => {
  try {
    jwt.verify(req.cookies.token, 'qwerty');

    next();
  } catch (err) {
    res.status(400).send('Sorry!!!You are not logged in yet');
  }
};
module.exports = {
  userValidation
};
