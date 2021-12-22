"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var Space = 4;
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.error = function (msg) {
        console.log("\u001B[31m CSVDN ERROR: " + msg + "\u001B[0m");
    };
    Logger.warn = function (msg) {
        console.log("\u001B[33m CSVDN WARNING: " + msg + "\u001B[0m");
    };
    Logger.log = function (msg) {
        console.log("" + msg);
    };
    Logger.findLargestString = function (msg) {
        var columnSpaces = [];
        var pad = Space;
        for (var i = 0; i < msg[0].length; i++) {
            var record = 0;
            for (var j = 0; j < msg.length; j++) {
                var len = ("" + msg[j][i]).length;
                if (len > record) {
                    record = len;
                }
            }
            columnSpaces.push(pad + record);
        }
        return columnSpaces;
    };
    return Logger;
}());
exports.Logger = Logger;
