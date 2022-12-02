const WalletMoviment = require('../models/WalletMoviment'); 
const Wallet = require('../models/Wallet');
const Category = require('../models/Category');

// wmc = wallet_moviments_controller

exports.index = async function(req,res) {
    let wmc = await WalletMoviment.find();
    res.status(201).json({data: wmc});
};

exports.show = async function(req, res) {
    let id = req.params.id;
    let wmc = await WalletMoviment.find({_id: id});
    res.status(201).json({data: wmc});
};

exports.create = async function(req,res) {
    res.sendFile(__basedir + '/web/views/wallets_moviments/form.html');
};

exports.store = async function(req, res) {
    if (validateWMC(req)) {
        const category = await Category.findOne({_id: req.params.category_id})
        const wallet = await Wallet.findOne({_id: req.params.wallet_id})
        let value = req.body.value;

        const data = {
            "category_id": category, 
            "wallet_id": wallet,
            "value": value
        };

        let wmc = await WalletMoviment.create(data);

        //atualizacao dos valores
        if (category.type == 'Saida'){
            value = value *(-1)
        }
        wallet.total += value
        await Wallet.updateOne({"_id": wallet.id}, {$set: {total: wallet.total}}); 

        res.status(201).json({message: 'Movimento feito com Sucesso', wmc: wmc});  
    } else {
        res.status(400).json({message: 'Valores inválidos'});
    }
};

exports.destroy = async function(req, res) {
    const id = req.params.id;
    let wmc = await WalletMoviment.findOneAndRemove({_id: id});
    if (wmc) {
        res.status(204).json({message: 'Registro deletado com sucesso!'});
    } else {
        res.status(404).json({message: 'Registro não encontrado'});
    }
};

exports.destroyAll = async function(req, res) {
    await WalletMoviment.deleteMany({});
    res.status(204).json({message: 'Registrso apagados com sucesso!'});
};

async function validateWMC(req) {
    const category = await Category.findOne({_id: req.params.category_id});
    const wallet = await Wallet.findOne({_id: req.params.wallet_id});
//    const category = req.params.category_id;
//    const wallet = req.params.wallet_id;
    const value = req.body.value;
    return ((category instanceof Category) && (wallet instanceof Wallet) && (typeof(value) == "number"))
}

