define(['app', 'jquery', 'underscore', 'utils'], function(App, $, _, utils) {

    describe('just checking', function() {

        it('works for app', function() {
            var el = $('<div></div>');

            var app = new App(el);
            app.render();

            expect(el.text()).toEqual('require.js up and running');
        });

        it('works for underscore', function() {
            // just checking that _ works
            expect(_.size([1,2,3])).toEqual(3);
        });

        it('require works', function(){
            var testObj1 = {
                "override1": "data1",
                "override2": "data2"
            };

            var testObj2 = {
                "override1": "data3",
                "override2": "data4"
            };

            var res = utils.mergeAttributes(testObj1, testObj2, {"override1":true});
            expect(res["override1"]).toEqual("data1");
            //assert.ok(res["override2"] === "data4");
        })

    });

});