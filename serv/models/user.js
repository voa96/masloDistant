const sequelize = require('../config/db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id:{type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{type:DataTypes.STRING,
        allowNull: false,
        validate:{isEmail: true},
    },
    password:{type:DataTypes.STRING,
        allowNull:false,
        validate:{min: 8}
    }
})

module.exports = {User}