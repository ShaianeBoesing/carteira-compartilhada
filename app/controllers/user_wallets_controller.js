const UserWallet = require('../models/UserWallet');
const User = require('../models/User');
const Wallet = require('../models/Wallet');

exports.getUsers = async function(req, res) {
    if (typeof __current_user !== 'undefined') {
        let wallet = await Wallet.findOne({_id: req.params.wallet_id})
        let users = await UserWallet.find({wallet: wallet}).select('user role').populate('user');
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

exports.addParticipant = async function(req, res) {
    if (typeof __current_user !== 'undefined') {
        let participant = await User.findOne({_id: req.params.participant_id});
        let wallet = await Wallet.findOne({_id: req.params.wallet_id});
        let userWallet = await UserWallet.create({wallet: wallet, user: participant, role: 'Participante'});
        res.status(201).json({data: userWallet, message: 'Participante Adicionado com Sucesso!'});
    } else {
        res.status(401).json({message: 'Usuário não está logado'});
    }
};
