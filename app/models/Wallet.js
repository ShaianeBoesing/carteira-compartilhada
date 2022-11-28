const mongoose = require('mongoose');

const Wallet = mongoose.model("Wallet", {
    name: {type: String}
});

module.exports = Wallet
