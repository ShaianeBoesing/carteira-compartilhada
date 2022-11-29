const routes = require('express').Router();
const session = require('../controllers/session_controller');
const users = require('../controllers/users_controller');
const wallets = require('../controllers/wallets_controller');
const users_wallets = require('../controllers/user_wallets_controller');

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

//Wallet
routes.get('/wallets', wallets.index)
routes.post('/wallets', wallets.store)
routes.get('/wallets/create', users.create);
routes.get('/wallets/:id', wallets.show)
routes.delete('/wallets/:id', wallets.destroy);

//Wallet
routes.get('/users_wallets/users/:wallet_id', users_wallets.getUsers)
routes.get('/users_wallets/wallets', users_wallets.getWallets)

module.exports = routes; 
