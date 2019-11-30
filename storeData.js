const sequelize = require("sequelize");

const Op = sequlize.Op;

const db = new sequelize("database", "username" , "password", {
    host: "localhost",
    dialect: "sqlite",
    logging: true,
    opertorsAliases: false,
    storage: "data/stars.sqlite"

});