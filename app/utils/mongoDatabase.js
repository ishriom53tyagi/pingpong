const mongodb = require('mongodb');
const config = require('../../config/config.json');
const MongoClient = mongodb.MongoClient;
const dbOptions = config.mongodb.options;

var dbName;
dbName =  "mongodb+srv://shriom:admin123@cluster0.r6u33.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// dbName = (config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.db);

// if (config.mongodb.username && config.mongodb.password) {
//     dbName = config.mongodb.username + ":" + config.mongodb.password + "@" + dbName;
// }

// if (dbName.indexOf('mongodb://') !== 0) {
//     dbName = 'mongodb://' + dbName;
// }

let _db;

const mongoConnect = callback => {
    MongoClient.connect(
        dbName, dbOptions
    )
        .then(client => {
            console.log('Connected!');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) {

        return _db;
    }
    throw 'No database found!';
};

const closeDb = () => {
    _db.close();
    return;
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
exports.closeDb = closeDb;
exports.dbName = dbName;
exports.dbOptions = dbOptions;
exports.MongoClient = MongoClient;
