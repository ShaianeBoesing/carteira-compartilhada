const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletSchema = new Schema(
    { name: {type: String} }, 
    { timestamps: true }
);

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
