const Wallet = require('../models/Wallet');
const UserWallet = require('../models/UserWallet');

exports.index = async function(req, res) {
    let wallets = await Wallet.find();
    res.status(201).json({data: wallets});
};

exports.show = async function(req, res) {
    let id = req.params.id;
    let wallet = await Wallet.find({_id: id});
    res.status(201).json({data: wallet});
};

exports.create = function(req, res) {
    res.sendFile(__basedir + '/web/views/wallets/create_wallet.html');
};

exports.store = async function(req, res) {
    if (validateWallet(req)) {
        const name = (req.body.nome).trim().toUpperCase();
        let wallet = await Wallet.findOne({"name": name});
        if(!wallet) {
            const data = {"name": name};
            let wallet = await Wallet.create(data);
            let userWallet = await UserWallet.create({wallet: wallet, user: __current_user})
            res.status(201).json({message: 'Carteira Criada com Sucesso', wallet: wallet});  
        } else  {
            res.status(409).json({message: 'Não é possível criar duas carteiras com o mesmo nome'});
        }    
    } else {
        res.status(400).json({message: 'Valores inválidos'});
    }
};

exports.destroy = async function(req, res) {
    const id = req.params.id;
    let wallet = await Wallet.findOneAndRemove({_id: id});
    if (wallet) {
        res.status(204).json({message: 'Carteira deletada com sucesso!'});
    } else {
        res.status(404).json({message: 'Carteira não encontrada'});
    }
};

const validateWallet = (req) => {
    const name = req.body.nome.trim();
    return name.length > 3;
}
