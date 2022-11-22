const User = require('../models/User');

exports.index = function(req, res) {
    if (typeof __current_user !== 'undefined') {
        res.sendFile(__basedir + '/web/views/dashboard/dashboard.html');
    } else {
        res.sendFile(__basedir + '/web/views/login/index.html');
    }
};

exports.login = async function(req, res) {
    const {email, password} = req.body;
    let user = await User.find({"email": email, "password": password});
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