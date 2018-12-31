// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define(
    'users',
    {
      name: {
        type: DataTypes.TEXT,
        description: 'name'
      },
      picture: {
        type: DataTypes.TEXT,
        description: 'Picture'
      },
      email: {
        type: DataTypes.TEXT,
        description: 'email'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'createdat'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updatedat'
      }
    },
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    }
  );

  // eslint-disable-next-line no-unused-vars
  users.associate = function(models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return users;
};
