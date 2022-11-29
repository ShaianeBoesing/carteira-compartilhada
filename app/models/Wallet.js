const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletSchema = new Schema(
    { 
        name: {type: String},
        total: {type: Number, default: 0.0} 
    }, 
    { timestamps: true }
);

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
