const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://tech.shaiane.brb.vms.ufsc.br:27017")
            .then(conn => global.conn = conn.db("workshoptdc"))
            .catch(err => console.log(err))

function findAll() {
    return global.conn.collection("customers").find().toArray();
}

