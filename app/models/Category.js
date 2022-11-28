const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema(
    { 
        name: {type: String},
        type: {type: String, enum: ['Entrada', 'Saida'], default: 'Saida'}
    }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
