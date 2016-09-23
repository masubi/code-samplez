var exports = module.exports = {};

// "borrowed from http://stackoverflow.com/questions/5643321/how-to-make-remote-rest-call-inside-node-js-any-curl"
exports.doRestCall = function(domainName, id, validCallback, invalidCallback){
    var https = require('https');

    /**
     * HOW TO Make an HTTP Call - GET
     */
    // options for GET
    var optionsget = {
        host : domainName, // here only the domain name
        // (no http/https !)
        port : 443,
        path : '/accounts/'+id, // the rest of the url with parameters if needed
        method : 'GET' // do GET
    };

    console.log('Options prepared:');
    console.log(optionsget);
    console.log('Do the GET call');

    // do the GET request
    var reqGet = https.request(optionsget, function(res) {
        console.log("statusCode: ", res.statusCode);
        if(res.statusCode==404){
            invalidCallback();
        }else{
            validCallback();
        }
        // uncomment it for header details
        //  console.log("headers: ", res.headers);


        //res.on('data', function(d) {
        //
        //    console.log('GET result:\n');
        //    //process.stdout.write(d);
        //    console.log(d);
        //    console.log("executing callback");
        //    callback();
        //    console.log('\n\nCall completed');
        //});

    });

    reqGet.end();
    reqGet.on('error', function(e) {
        console.error(e);
    });
};

exports.checkValidLiveStreamId = function(id, successCb, failureCb){
    var liveStreamAPI = require('./livestreamAPI');
    var validCb = function(){
        console.log("checkValidLiveStreamId - valid: "+id);
        if(successCb)
            successCb();
    };
    var invalidCb = function(){
        console.log("checkValidLiveStreamId - invalid: "+id);
        if(failureCb)
            failureCb();
    };
    liveStreamAPI.doRestCall("livestream.com", id, validCb, invalidCb);

};