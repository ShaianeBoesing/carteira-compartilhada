const User = require('../models/User');
const md5 = require('md5');

exports.index = function(req, res) {
    if (typeof __current_user !== 'undefined') {
        res.sendFile(__basedir + '/web/views/dashboard/dashboard.html');
    } else {
        res.sendFile(__basedir + '/web/views/login/index.html');
    }
};

exports.login = async function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.find({"email": email, "password": md5(password)});
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    global.__current_user = user;

    res.status(200).send(user);
};


exports.logout = async function(req, res) {
    global.__current_user = undefined;
    return res.status(205).send({ message: "Logged Out" });
}