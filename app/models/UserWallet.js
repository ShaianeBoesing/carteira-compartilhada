const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userWalletSchema = new Schema(
    { 
        wallet_id: {type: String},
        user_id: {type: String},
        role: {type: String, enum: ['Administrador', 'Participante'], default: 'Administrador'}
    }
);

const UserWallet = mongoose.model("userWallet", userWalletSchema);

module.exports = UserWallet;
