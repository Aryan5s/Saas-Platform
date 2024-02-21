const { sequelize, DataTypes } = require('../config/db');
const { Snowflake } = require("@theinternetfolks/snowflake");

const Member = sequelize.define('Member', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: Snowflake.generate()
  },
  community: {
    type: DataTypes.STRING,
    references: {
      model: 'communities',
      key: 'id'
    }
  },
  user: {
    type: DataTypes.STRING, 
    references: {
      model: 'users',
      key: 'id'
    }
  },
  role: {
    type: DataTypes.STRING,
    references: {
      model: 'roles',
      key: 'id'
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Member;
