QUnit.module( "Utils Tests", {

});

QUnit.test("mergeAttributes", function(assert){
    var utils = require('utils');
    var testObj1 = {
        "override1": "data1",
        "override2": "data2"
    };

    var testObj2 = {
        "override1": "data3",
        "override2": "data4"
    };

    var res = utils.mergeAttributes(testObj1, testObj2, {"override1":true});
    assert.ok(res["override1"] === "data1");
    assert.ok(res["override2"] === "data4");
});