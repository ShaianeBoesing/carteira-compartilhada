const loggedIn = (req, res, next) => {
    if (typeof __current_user == 'undefined') {
        res.status(401).sendFile(__basedir + '/web/views/login/index.html');
    } else {
        next();
    }
}

module.exports = loggedIn;