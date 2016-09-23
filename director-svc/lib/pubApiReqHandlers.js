var exports = module.exports = {};

exports.update =function(req, resp){

    // basic defensive programming
    if(!req) throw("missing req");
    if(!req.body) throw ("missing req.body");

    var postData = req.body;
    if(!postData["livestream_id"]) throw("missing livestream_id");

    // call back to persist the modify request
    var persistModify = function(){
        var storage = require('./storage');
        var utils = require('./utils');
        var sanitized = utils.sanitizeInputs(postData);

        storage.get(postData["livestream_id"], function(err, res){
            var updateStr = "";
            if(!res){
                updateStr = JSON.stringify(sanitized)
            }else{
                var mutableFields = utils.getMutableFieldsFromObj(sanitized);
                var updatedObj = utils.mergeAttributes(JSON.parse(res), mutableFields);
                updateStr = JSON.stringify(updatedObj);
            }
            storage.set(postData["livestream_id"], updateStr, function(){
                resp.send(JSON.stringify(JSON.parse(updateStr),null, ' '));
            });
        });
    };

    var invalidIdCb = function(){
        resp.send("invalid livestream id: "+postData["livestream_id"]);
    };

    // api call - check if valid
    var liveStreamAPI = require('./livestreamAPI');
    liveStreamAPI.checkValidLiveStreamId(postData["livestream_id"], persistModify, invalidIdCb);

};

exports.directors = function(req, resp){
    // basic defensive programming
    if(!req) throw("missing req");
    if(!req.body) throw ("missing req.body");

    var postData = req.body;
    if(!postData["livestream_id"]) throw("missing livestream_id");

    // persist create request callback
    var persistCreate = function(){
        var storage = require('./storage');
        var utils = require('./utils');
        var sanitized = utils.sanitizeInputs(postData);
        storage.set(postData["livestream_id"], JSON.stringify(sanitized), function(){
            storage.get(postData["livestream_id"], function(err, res){
                var msg = JSON.stringify(JSON.parse(res),null, ' ');
                console.log(msg);
                resp.send(msg);
            })
        });
    };

    var invalidIdCb = function(){
        resp.send("invalid livestream id: "+postData["livestream_id"]);
    };

    // api call - check if valid
    var liveStreamAPI = require('./livestreamAPI');
    liveStreamAPI.checkValidLiveStreamId(postData["livestream_id"], persistCreate, invalidIdCb);
};


// TODO:  bug w/ handling 0 keys doesn't return response
exports.list = function(req, resp){
    var storage = require('./storage');
    storage.getAllKeys(function(err, keys){

        // TODO:  need a better manager because this is not scalable
        exports.allDirectors = {};  //shared
        exports.resCount = 0;       // shared

        for(var i = 0; i < keys.length; i++) {
            var getCB = function(localKey, toteKeys){
                return function(err, storageRes){
                    console.log("key: "+localKey+", got storage result: "+storageRes);
                    exports.allDirectors[localKey]=JSON.parse(storageRes);
                    exports.resCount++;

                    // if final response from redis
                    if(exports.resCount === toteKeys || toteKeys === 0){
                        console.log("got final result from redis: "+JSON.stringify(exports.allDirectors));
                        resp.send(JSON.stringify(exports.allDirectors, null, ' '));
                    }
                }
            };

            var key = keys[i];
            storage.get(key, getCB(key, keys.length));
        }
    });
};