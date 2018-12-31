// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const messages = sequelizeClient.define(
    'messages',
    {
      content: {
        type: DataTypes.TEXT,
        description: 'content'
      },
      from: {
        type: DataTypes.BIGINT,
        description: 'from'
      },
      to: {
        type: DataTypes.BIGINT,
        description: 'to'
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'createdat',
        description: 'createdat'
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updatedat',
        description: 'updatedat'
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
  messages.associate = function(models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return messages;
};
