const {sequelize , DataTypes } = require('../config/db');
const {Snowflake} = require('@theinternetfolks/snowflake')

const User = sequelize.define('user', {
    id: {
        type: DataTypes.STRING,
        primaryKey : true,
        defaultValue : Snowflake.generate()
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true 
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATEONLY,
        defaultValue : DataTypes.NOW()
    },
    updated_at : {
        type : DataTypes.DATEONLY,
        defaultValue : DataTypes.NOW()
    }
});

module.exports =  User;