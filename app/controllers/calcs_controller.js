const Wallet = require('../models/Wallet');
const User = require('../models/User');
const UserWallet = require('../models/UserWallet');

//Total 
exports.total = async function(req, res) {
    let wallets = await UserWallet.find({user: __current_user}).select('wallet').populate('wallet');
    let response = 0;
    wallets.forEach(el => {
        response += el.wallet.total
    });
    res.status(201).json({total: response});
};

//Total por carteira
exports.totalByWallet = async function(req, res) {
    let wallets = await UserWallet.find({user: __current_user}).select('wallet').populate('wallet');
    let response = [];
    wallets.forEach(el => {
        response.push({
            "_id": el.wallet.id,
            "name": el.wallet.name, 
            "total": el.wallet.total, 
            "created_at": el.wallet.createdAt
        })
    });
    res.status(201).json({data: response});
};
