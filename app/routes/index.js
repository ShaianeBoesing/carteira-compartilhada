const routes = require('express').Router();
const loggedIn = require('../middlewares/logged_in_middleware');
const session = require('../controllers/session_controller');
const users = require('../controllers/users_controller');
const wallets = require('../controllers/wallets_controller');
const users_wallets = require('../controllers/user_wallets_controller');
const categories = require('../controllers/categories_controller');
const wallets_moviments = require('../controllers/wallets_moviments_controller');
const calcs = require('../controllers/calcs_controller');

// Login
routes.get('/', loggedIn, session.index);
routes.post('/login', session.login);
routes.post('/logout', session.logout);

// Users
routes.get('/users', loggedIn, users.index);
routes.post('/users', users.store);
routes.get('/users/create', users.create);
routes.get('/users/me', loggedIn, users.show);
routes.patch('/users/:id', loggedIn, users.update);
routes.delete('/users/:id', loggedIn, users.destroy);
routes.delete('/users/delete/all', loggedIn, users.destroyAll);

//Wallet
routes.get('/wallets', loggedIn, wallets.index);
routes.post('/wallets', loggedIn, wallets.store);
routes.get('/wallets/create', loggedIn, wallets.create);
routes.get('/wallets/:id', loggedIn, wallets.show);
routes.delete('/wallets/:id', loggedIn, wallets.destroy);

//Users Wallets
routes.get('/users_wallets/users/w/:wallet_id', loggedIn, users_wallets.getUsers);
routes.get('/users_wallets/wallets', loggedIn, users_wallets.getWallets);
routes.post('/users_wallets/w/:wallet_id/u/:participant_id', loggedIn, users_wallets.addParticipant);
routes.delete('/users_wallets/w/:wallet_id/u/:participant_id', loggedIn, users_wallets.removeParticipant);

//Category
routes.get('/categories', loggedIn, categories.index);
routes.post('/categories', loggedIn, categories.store);
routes.get('/categories/create', loggedIn, categories.create);
routes.get('/categories/:id', loggedIn, categories.show);
routes.patch('/categories/:id', loggedIn, categories.update);
routes.delete('/categories/:id', loggedIn, categories.destroy);

//Category
routes.get('/categories', loggedIn, categories.index)
routes.post('/categories', loggedIn, categories.store)
routes.get('/categories/create', loggedIn, categories.create);
routes.get('/categories/:id', loggedIn, categories.show)
routes.patch('/categories/:id', loggedIn, categories.update);
routes.delete('/categories/:id', loggedIn, categories.destroy);

//Calculate 
routes.get('/calculate/total/wallet', loggedIn, calcs.totalByWallet)
routes.get('/calculate/total', loggedIn, calcs.total)

//Wallet Moviment
routes.get('/wallets_moviments', loggedIn, wallets_moviments.index);
routes.post('/wallets_moviments/w/:wallet_id', loggedIn, wallets_moviments.store); //terei acesso ao valor no body ou no link?
routes.get('/wallets_moviments/create', loggedIn, wallets_moviments.create);
routes.get('/wallets_moviments/:id', loggedIn, wallets_moviments.show);
routes.delete('/wallets_moviments/:id', loggedIn, wallets_moviments.destroy); //apenas o registro do movimento é deletado, o valor modificado na carteira permanece
routes.delete('/wallets_moviments/delete/all', loggedIn, wallets_moviments.destroyAll);

module.exports = routes; 
