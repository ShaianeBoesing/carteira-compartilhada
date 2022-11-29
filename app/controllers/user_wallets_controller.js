const UserWallet = require('../models/UserWallet');

exports.getUsers = async function(req, res) {
    if (typeof __current_user !== 'undefined') {
        wallet_id = req.params.wallet_id
        let users = await UserWallet.find({wallet: wallet_id}).select('user').populate('user');
        res.status(201).json({data: users});
    } else {
        res.status(401).json({message: 'Usuário não está logado'});
    }
};

exports.getWallets = async function(req, res) {
    if (typeof __current_user !== 'undefined') {
        let wallets = await UserWallet.find({user: __current_user}).select('wallet').populate('wallet');
        res.status(201).json({data: wallets});
    } else {
        res.status(401).json({message: 'Usuário não está logado'});
    }
};
