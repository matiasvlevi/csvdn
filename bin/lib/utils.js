"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.findLargest = function (list) {
        var record = 0;
        for (var i = 0; i < list.length; i++) {
            if (+list[i] > record) {
                record = list[i];
            }
        }
        return record;
    };
    return Utils;
}());
exports.Utils = Utils;
