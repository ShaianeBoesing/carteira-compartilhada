const routes = require('express').Router();
const loggedIn = require('../middlewares/logged_in_middleware')
const session = require('../controllers/session_controller');
const users = require('../controllers/users_controller');
const wallets = require('../controllers/wallets_controller');
const users_wallets = require('../controllers/user_wallets_controller');
const categories = require('../controllers/categories_controller');

// Login
routes.get('/', loggedIn, session.index);
routes.post('/login', session.login);
routes.post('/logout', session.logout);

// Users
routes.get('/users', loggedIn, users.index);
routes.post('/users', loggedIn, users.store);
routes.get('/users/create', loggedIn, users.create);
routes.get('/users/:id', loggedIn, users.show);
routes.patch('/users/:id', loggedIn, users.update);
routes.delete('/users/:id', loggedIn, users.destroy);
routes.delete('/users/delete/all', loggedIn, users.destroyAll);

//Wallet
routes.get('/wallets', loggedIn, wallets.index)
routes.post('/wallets', loggedIn, wallets.store)
routes.get('/wallets/create', loggedIn, wallets.create);
routes.get('/wallets/:id', loggedIn, wallets.show)
routes.delete('/wallets/:id', loggedIn, wallets.destroy);

//Users Wallets
routes.get('/users_wallets/users/:wallet_id', loggedIn, users_wallets.getUsers)
routes.get('/users_wallets/wallets', loggedIn, users_wallets.getWallets)
routes.post('/users_wallets/:wallet_id/:participant_id', loggedIn, users_wallets.addParticipant)

//Category
routes.get('/categories', loggedIn, categories.index)
routes.post('/categories', loggedIn, categories.store)
routes.get('/categories/create', loggedIn, categories.create);
routes.get('/categories/:id', loggedIn, categories.show)
routes.patch('/categories/:id', loggedIn, categories.update);
routes.delete('/categories/:id', loggedIn, categories.destroy);

module.exports = routes; 
