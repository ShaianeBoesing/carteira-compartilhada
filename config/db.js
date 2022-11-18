const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const DB_NAME = 'teste-db';
const DB_USER = 'shaianebrb';
const DB_PASSWORD = 'KHkbwoBiXA';
const MONGO_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.plq5oho.mongodb.net/?retryWrites=true&w=majority`;

const db = {};
db.mongoose = mongoose;
db.url = MONGO_URL;

module.exports = db;

