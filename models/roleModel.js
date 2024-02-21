const {sequelize , DataTypes } = require('../config/db');
const {Snowflake} = require('@theinternetfolks/snowflake')

const Role = sequelize.define('role', {
    id: {
        type: DataTypes.STRING,
        primaryKey : true,
        defaultValue : Snowflake.generate()
    },
    name: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique : true
    },
    created_at: {
        type: DataTypes.DATEONLY,
        defaultValue : DataTypes.NOW
    },
    updated_at : {
        type : DataTypes.DATEONLY,
        defaultValue : DataTypes.NOW
    }
});

module.exports =  Role;