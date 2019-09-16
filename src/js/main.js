/*
 * ngsi-entity-filter
 * https://github.com/lets-fiware/ngsi-entity-filter-operator
 *
 * Copyright (c) 2019 Kazuhito Suda
 * Licensed under the MIT license.
 */

(function () {

    "use strict";

    MashupPlatform.wiring.registerCallback('entityInput', function (entities) {
        var types = MashupPlatform.prefs.get('types').trim().split(',');
        if (types.length > 0 && MashupPlatform.operator.outputs.entityOutput.connected) {
            var new_entites = entities.filter(function (e) {
                return types.indexOf(e.type) !== -1;
            });

            MashupPlatform.wiring.pushEvent("entityOutput", new_entites);
        }
    });

})();
