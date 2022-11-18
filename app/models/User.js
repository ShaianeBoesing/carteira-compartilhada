const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model("User", {
    name: {type: String},
    email: {type: String},
    password: {type: String}
});

module.exports = User
