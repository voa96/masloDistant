const {Sequelize} = require('sequelize')
module.exports = new Sequelize('test','postgres','120150',{
    dialect: 'postgres'
})