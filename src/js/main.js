/*
 * ngsi-entity-filter
 * https://github.com/lets-fiware/ngsi-entity-filter-operator
 *
 * Copyright (c) 2019,2020 Kazuhito Suda
 * Licensed under the MIT license.
 */

(function () {

    "use strict";

    var ngsiEntityFilter = function ngsiEntityFilter(entities) {
        var types = MashupPlatform.prefs.get('types').trim().split(',');
        if (MashupPlatform.operator.outputs.entityOutput.connected) {
            var new_entites = entities.filter(function (e) {
                return types.indexOf(e.type) !== -1;
            });

            MashupPlatform.wiring.pushEvent("entityOutput", new_entites);
        }
    }

    /* TODO
     * this if is required for testing, but we have to search a cleaner way
     */
    if (window.MashupPlatform != null) {
        MashupPlatform.wiring.registerCallback('entityInput', ngsiEntityFilter);
    }

    /* test-code */
    window.ngsiEntityFilter = ngsiEntityFilter;
    /* end-test-code */
})();
