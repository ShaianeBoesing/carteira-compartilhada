const routes = require('express').Router();
const login = require('../controllers/login_controller');

routes.get('/', login.index);


module.exports = routes; 
