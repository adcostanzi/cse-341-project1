const dotenv = require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

let database;

const initDB = (callback) => {
    if (database) {
        console.log("Database already initialized");
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGO_CLIENT)
    .then((client) => {
        database = client;
        callback(null, database);
    })
    .catch((err) => {
        callback(err);
    });
};

const getDB = () => {
    if(!database){
        throw Error("Database has not been initialized!");
    }
    return database;
};

module.exports = {initDB, getDB};