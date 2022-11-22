const User = require('../models/User');
const md5 = require('md5');

exports.index = async function(req, res) {
    let users = await User.find()
    res.status(201).json({data: users})
};

exports.store = async function(req, res) {
    const {name, email} = req.body;
    const password = md5(req.body.password);
    let user = await User.find({"email": email});
    if(!user) {
        const user = {
            name, 
            email, 
            password
        };
        await User.create(user)
        res.status(201).json({message: 'Usuário Criado com Sucesso'})    
    } else  {
        res.status(409).json({message: 'Usuário Já Existe'})    
    }
};

exports.destroyAll = async function(req, res) {
    await User.deleteMany({})
    res.status(204).json({message: 'Usuários deletados com sucesso!'})
};