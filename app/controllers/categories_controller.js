const Category = require('../models/Category');

exports.index = async function(req, res) {
    let categories = await Category.find();
    res.status(201).json({data: categories});
};

exports.show = async function(req, res) {
    let id = req.params.id;
    let category  = await Category.find({_id: id});
    res.status(201).json({data: category});
};

exports.create = function(req, res) {
    res.sendFile(__basedir + '/web/views/categories/form.html');
};

exports.store = async function(req, res) {
    if (validateCategory(req)) {
        const name = (req.body.name).trim().toUpperCase();
        const type = req.body.type;
        //let category = await Category.findOne({"name": name});
        //if(!category) {
        const data = {"name": name, "type": type};
        let category = await Category.create(data);
        res.status(201).json({message: 'Categoria criada com Sucesso', category: category});  
        // } else  {
        //    res.status(409).json({message: 'Não é possível criar duas categorias com o mesmo nome'});
        // }    
    } else {
        res.status(400).json({message: 'Valores inválidos'});
    }
};

exports.update = async function(req, res){
    if (validateCategory(req)){
        const id = req.params.id;
        const name = req.body.name.trim().toUpperCase();
        const type = req.body.type
        let category = await Category.findOneAndUpdate({"_id": id}, {name: name, type: type}, {new: true})
        if (category){
            res.status(201).json({message: 'Categoria atualizada com sucesso', category: category});
        } else{
            res.status(404).json({message: 'Categoria nao econtrada'});
        }
    } else{
        res.status(400).json({message: 'Valores invalidos'});
    }
}

exports.destroy = async function(req, res) {
    const id = req.params.id;
    let category = await Category.findOneAndRemove({_id: id});
    if (category) {
        res.status(204).json({message: 'Categoria deletada com sucesso!'});
    } else {
        res.status(404).json({message: 'Categoria não encontrada'});
    }
};

const validateCategory = (req) => {
    const name = req.body.name.trim();
    const type = req.body.type.trim();
    return (name.length > 2 && (type === 'Entrada' || type === 'Saida'))
}
