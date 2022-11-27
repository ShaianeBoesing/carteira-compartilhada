const routes = require('express').Router();
const session = require('../controllers/session_controller');
const users = require('../controllers/users_controller');

// Login
routes.get('/', session.index);
routes.post('/login', session.login);
routes.post('/logout', session.logout);

// Users
routes.get('/users', users.index);
routes.post('/users', users.store);
routes.get('/users/create', users.create);
routes.get('/users/:id', users.show);
routes.patch('/users/:id', users.update);
routes.delete('/users/:id', users.destroy);
routes.delete('/users/delete/all', users.destroyAll);


module.exports = routes; 
