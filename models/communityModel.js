const { sequelize , DataTypes } = require('../config/db');
const { Snowflake } = require("@theinternetfolks/snowflake");

const Community = sequelize.define('community', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: Snowflake.generate()
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    owner: {
      type: DataTypes.STRING, 
      allowNull: false,
     references : {
      model : `User`,
      key : 'id'
     }
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
});

module.exports = Community

