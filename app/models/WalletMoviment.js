const mongoose = require('mongoose');
const Wallet = require('./Wallet');
const Category = require('./Category');

const Schema = mongoose.Schema;

const walletMovimentSchema = new Schema(
    { 
        category_id: {type: mongoose.Types.ObjectId, ref: "Category"},
        wallet_id: {type: mongoose.Types.ObjectId, ref: "Wallet"},
        value: {type: Number}
    },
    { timestamps: true }
);

const WalletMoviment = mongoose.model("WalletMoviment", walletMovimentSchema);

module.exports = WalletMoviment;
