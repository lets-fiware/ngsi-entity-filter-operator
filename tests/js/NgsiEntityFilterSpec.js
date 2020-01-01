/* globals MockMP */

(function () {

    "use strict";

    describe("NgsiEntityFilter", function () {

        beforeAll(function () {
            window.MashupPlatform = new MockMP({
                type: 'operator',
                prefs: {
                    'types': 'test'
                },
                inputs: ['entityInput'],
                outputs: ['entityOutput']
            });
        });

        beforeEach(function () {
            MashupPlatform.reset();
            MashupPlatform.operator.outputs.entityOutput.connect({simulate: () => {}});
        });

        it("type", function () {
            MashupPlatform.prefs.set('types', 'test');

            ngsiEntityFilter([{'type': 'test'}, {'type': 'abc'}, {'type': 'xyz'}, {'type': '123'}]);

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('entityOutput', [{'type': 'test'}]);
        });

        it("types", function () {
            MashupPlatform.prefs.set('types', 'abc,xyz');

            ngsiEntityFilter([{'type': 'test'}, {'type': 'abc'}, {'type': 'xyz'}, {'type': '123'}]);

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('entityOutput', [{'type': 'abc'}, {'type': 'xyz'}]);
        });

        it("no type", function () {
            MashupPlatform.prefs.set('types', '');

            ngsiEntityFilter([{'type': 'test'}, {'type': 'abc'}, {'type': 'xyz'}, {'type': '123'}]);

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('entityOutput', []);
        });

        it("output endoint is not connected", function () {
            MashupPlatform.operator.outputs.entityOutput.disconnect();

            ngsiEntityFilter([{'type': 'test'}]);

            expect(MashupPlatform.wiring.pushEvent).not.toHaveBeenCalled();
        });
    });
})();
