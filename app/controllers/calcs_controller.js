const Wallet = require('./Wallet');
const User = require('./User');

//Total Wallet será mantido dentro de Wallet
//Total por carteira
exports.totalByWallet = async function(req, res) {
    let wallets = await UserWallet.find({user: __current_user}).select('wallet').populate('wallet');
    wallets.forEach(wallet => {
        console.log(wallet)
    });
    res.status(201).json({data: category});
};
