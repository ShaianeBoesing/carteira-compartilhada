const Wallet = require('../models/Wallet');

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
    if (typeof __current_user !== 'undefined') {
        res.sendFile(__basedir + '/web/views/wallets/form.html');
    } else {
        res.sendFile(__basedir + '/web/views/login/index.html');
    }
};

exports.store = async function(req, res) {
    if (validateWallet(req)) {
        const name = (req.body.name).trim().toUpperCase();
        let wallet = await Wallet.findOne({"name": name});
        if(!wallet) {
            const data = {name};
            let wallet = await Wallet.create(data);
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
    const name = req.body.name.trim();
    return name.length > 3;
}