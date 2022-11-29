const mongoose = require('mongoose');
const Wallet = require('./Wallet');
const User = require('./User');


const Schema = mongoose.Schema;

const userWalletSchema = {
    wallet: {type: mongoose.Types.ObjectId, ref: "Wallet"},
    user: {type: mongoose.Types.ObjectId, ref: "User"},
    role: {type: String, enum: ['Administrador', 'Participante'], default: 'Administrador'}
};

const UserWallet = mongoose.model("userWallet", userWalletSchema);

module.exports = UserWallet;
