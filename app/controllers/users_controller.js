const User = require('../models/User');

exports.index = async function(req, res) {
    let users = await User.find()
    res.status(201).json({data: users})
};

exports.store = async function(req, res) {
    const {name, email, password} = req.body;
    const user = {
        name, 
        email, 
        password
    };
    await User.create(user)
    res.status(201).json({message: 'Usuário Criado com Sucesso'})
};
