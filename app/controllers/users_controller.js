const User = require('../models/User');
const md5 = require('md5');

exports.index = async function(req, res) {
    let users = await User.find();
    res.status(201).json({data: users});
};

exports.show = async function(req, res) {
    let user = __current_user
    res.status(201).json({data: user});
};

exports.create = function(req, res) {
    res.sendFile(__basedir + '/web/views/users/form.html');
};

exports.store = async function(req, res) {
    if (validateUser(req)) {
        const {name, email} = req.body;
        const password = md5(req.body.password);
        let user = await User.findOne({"email": email});
        if(!user) {
            const data = {
                name, 
                email, 
                password
            };
            let user = await User.create(data);
            res.status(201).json({message: 'Usuário Criado com Sucesso', user: user});  
        } else  {
            res.status(409).json({message: 'Usuário Já Existe'});
        }    
    } else {
        res.status(400).json({message: 'Valores inválidos'});
    }
};

exports.update = async function(req, res) {
    if (validateUser(req)) {
        const id = req.params.id;
        const name = req.body.name;
        const email = req.body.email;
        let user = await User.findOneAndUpdate({"_id": id}, {name: name, email: email}, {new: true});  //new é para retornar o usuário com seus valores atualizados  
        if(user) {
            res.status(201).json({message: 'Usuário Atualizado com Sucesso', user: user});
        } else  {
            res.status(404).json({message: 'Usuário não encontrado'});
        }
    } else {
        res.status(400).json({message: 'Valores inválidos'});
    }
};

exports.destroy = async function(req, res) {
    const id = req.params.id;
    let user = await User.findOneAndRemove({_id: id});
    if (user) {
        res.status(204).json({message: 'Usuário deletado com sucesso!'});
    } else {
        res.status(404).json({message: 'Usuário não encontrado'});
    }
};

exports.destroyAll = async function(req, res) {
    await User.deleteMany({});
    res.status(204).json({message: 'Usuários deletados com sucesso!'});
};

const validateUser = (req) => {
    const {name, email} = req.body;
    return  ((name.length > 3) && (validateEmail(email)));
}

const validateEmail = (email) => {
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    return email.match(pattern);
};
  