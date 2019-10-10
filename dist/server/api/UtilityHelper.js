/**
 * Utility helper module for share common useful functions
 */

'use strict';

let UtilityHelper = class UtilityHelper {
    static padRight(str, padString, length) {
        while (str.length < length) str = str + padString;
        return str;
    }

    static padLeft(str, padString, length) {
        while (str.length < length) str = padString + str;
        return str;
    }

    static replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }
};

// export the class

module.exports = UtilityHelper;
//# sourceMappingURL=utilityHelper.js.map
