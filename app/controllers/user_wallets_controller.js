const UserWallet = require('../models/UserWallet');
const User = require('../models/User');
const Wallet = require('../models/Wallet');

exports.getUsers = async function(req, res) {
    let wallet = await Wallet.findOne({_id: req.params.wallet_id})
    let users = await UserWallet.find({wallet: wallet}).select('user role').populate('user');
    res.status(201).json({data: users});
};

exports.getWallets = async function(req, res) {
    let wallets = await UserWallet.find({user: __current_user}).select('wallet').populate('wallet');
    res.status(201).json({data: wallets});
};

exports.addParticipant = async function(req, res) {
    let participants_emails = req.body.participants_emails;
    let wallet = await Wallet.findOne({_id: req.params.wallet_id});
    let users_wallets = []; 
    let errors = []
    participants_emails.forEach(async email => {
        participant = await User.findOne({email: email})
        if (!participant) {
            errors.push(`E-mail ${email} inválido`)
        } else {
            let already_in_wallet = await UserWallet.findOne({user: participant, wallet: wallet})
            if (!already_in_wallet) {
                let user_wallet = await UserWallet.create({wallet: wallet, user: participant, role: 'Participante'});
                users_wallets.push(user_wallet)
            } else {
                errors.push(`Usuário ${participant.name} já faz parte da carteira`)
            }
        }
    });
    
    res.status(201).json({data: userWallet, message: `${users_wallets.length} Participantes Adicionados!`, errors: JSON.stringify(errors)});                
};


exports.removeParticipant = async function(req, res) {
    let participant = await User.findOne({_id: req.params.participant_id});
    let wallet = await Wallet.findOne({_id: req.params.wallet_id});
    let userWallet = await UserWallet.findOne({wallet: wallet, user: participant}).select('role -_id');
    if (userWallet.role != 'Administrador') {
        await UserWallet.findOneAndRemove({wallet: wallet, user: participant});
        res.status(201).json({message: 'Participante Removido com Sucesso!'});    
    } else {
        res.status(409).json({message: 'Não é possível remover o Administrador da Carteira!'});    
    }
};
