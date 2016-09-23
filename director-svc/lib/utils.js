var exports = module.exports = {};

exports.getTimestamp = function(){
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "_"
        + (currentdate.getMonth()+1)  + "_"
        + currentdate.getFullYear() + "@"
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    return datetime;
};

exports.stringifyCircularObj = function(obj){
    return JSON.stringify(obj, function( key, value) {
        if( key == 'parent') { return value.id;}
        else {return value;}
    });
};

/**
 * if currObj has attribute in overWriteObj, then overwrite
 * if overWriteObj has attribute not in currObj, then add to currObj
 * doesn't handle circular references
 *
 * @param currObj
 * @param overWriteObj
 * @return resultObj
 */
exports.mergeAttributes = function(currObj, overWriteObj){
    for(var attr in overWriteObj){
        currObj[attr]=overWriteObj[attr];
    }
    return JSON.parse(JSON.stringify(currObj));
};

exports.sanitizeInputs = function(jsonObj){
    if(typeof(jsonObj) !== 'object') throw "sanitizeInputs not an object";
    var resObj = {};
    jsonObj = JSON.parse(JSON.stringify(jsonObj));
    var checkAttrName = function(attrName, obj){
        if(obj[attrName] && typeof(obj[attrName]==='str')){
            resObj[attrName]=obj[attrName];
        }
    };
    checkAttrName("full_name", jsonObj);
    checkAttrName("favorite_camera", jsonObj);
    checkAttrName("favorite_movies", jsonObj);
    checkAttrName("livestream_id", jsonObj);

    return resObj;
};

exports.getMutableFieldsFromObj = function(jsonObj){
    if(typeof(jsonObj) !== 'object') throw "getMutableFields did not receive an object";
    var resObj = {};
    jsonObj = JSON.parse(JSON.stringify(jsonObj));
    var checkAttrName = function(attrName, obj){
        if(obj[attrName] && typeof(obj[attrName]==='str')){
            resObj[attrName]=obj[attrName];
        }
    };
    checkAttrName("favorite_camera", jsonObj);
    checkAttrName("favorite_movies", jsonObj);
    return resObj;
};