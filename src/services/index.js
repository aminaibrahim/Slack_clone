const users = require('./users/users.service.js');
const messages = require('./messages/messages.service.js');
const accesstoken = require('./accesstoken/accesstoken.service.js');
const currentuser = require('./currentuser/currentuser.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(messages);
  app.configure(accesstoken);
  app.configure(currentuser);
};
