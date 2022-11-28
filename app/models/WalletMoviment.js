const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletMovimentSchema = new Schema(
    { 
        category_id: {type: String},
        wallet_id: {type: String},
        value: {type: Number}
    }, 
    { timestamps: true }
);

const WalletMoviment = mongoose.model("WalletMoviment", walletMovimentSchema);

module.exports = WalletMoviment;
