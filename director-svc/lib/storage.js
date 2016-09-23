var exports = module.exports = {};
var fs = require('fs');
var storagePath = "./storage/";

exports.writeFile = function(relativePath, contents, callback){
    try {
        fs.mkdirSync(storagePath);
    } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
    }

    fs.writeFile(storagePath+relativePath, contents, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Wrote to file: "+storagePath+relativePath);
    });
};

exports.readFile = function(relativePath, callback){
    fs.readFile(storagePath+relativePath, function (err, data) {
        if (err){
            return console.log(err);
        }
        console.log("Read from file: "+storagePath+relativePath);
        console.log("data: "+data);
        callback(data);
    });
};

exports.initGetStorage = function(){
  if(!exports.storageClient){
      var redis = require("fakeredis").createClient();
      exports.storageClient = redis
  }
  return exports.storageClient;

};

exports.set = function(key, value, callback){
    var client = exports.initGetStorage();
    client.set([key,value],callback);
};

/**
 *
 * @param key
 * @param callback - function(err,res){ }
 */
exports.get = function(key, callback){
    var client = exports.initGetStorage();
    client.get([key], callback);
};

/**
 *
 * @param cb - function(err, keys){ }
 */
exports.getAllKeys = function(cb){
    var client = exports.initGetStorage();
    client.KEYS('*', function (err, keys) {
        try{
            console.log("keys: "+keys);
            if (err) throw err.toString();
            for(var i = 0, len = keys.length; i < len; i++) {
                console.log(keys[i]);
            }
            cb(err, keys);
        }catch(e){
            console.log("Error getting all keys/doing callback: "+ e.toString());
            console.log("lord have mercy!")
        }
    });
};