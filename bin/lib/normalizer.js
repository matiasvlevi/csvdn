"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSVDN = void 0;
var fs = __importStar(require("fs"));
var logger_1 = require("./logger");
var utils_1 = require("./utils");
var csvExportDefaults = {
    tab: false,
    header: true,
    align: 'right',
    normalized: true,
    join: ',',
    color: false
};
var logDefaults = {
    tab: true,
    header: true,
    align: 'right',
    normalized: false,
    join: '',
    color: true
};
var DefaultNormalizationAlgs = {
    map: function map(doc, col) {
        var labels = [];
        if (doc.checkIfLabel(col)) {
            labels = doc.rules[doc.head[col]].labels;
        }
        var stream = [];
        for (var i = 0; i < doc.content.length; i++) {
            var value = 0;
            if (labels.length > 0) {
                value = labels.indexOf(doc.content[i][col]);
            }
            else {
                value = Number(doc.content[i][col]);
            }
            if (value !== -1) {
                stream.push(value);
            }
            else {
                var foundLabels = doc.countLabels(col);
                var errmsg = "This datastream has more labels than expected,"
                    + (" " + labels.length + " were specified and got " + foundLabels.length + " different labels\n")
                    + ("specified: ( " + labels.join(' , ') + " )\n")
                    + ("found: ( " + foundLabels.join(' , ') + " )\n");
                logger_1.Logger.error(errmsg);
            }
        }
        var record = utils_1.Utils.findLargest(stream);
        // Normalize
        for (var i = 0; i < stream.length; i++) {
            stream[i] = stream[i] / record;
        }
        return stream;
    },
    bool: function bool(doc, col) {
        var labels = doc.findLabels(col, 2);
        var stream = [];
        for (var i = 0; i < doc.content.length; i++) {
            var value = labels.indexOf(doc.content[i][col]);
            if (value !== -1) {
                stream.push(value);
            }
            else {
                logger_1.Logger.error('This datastream is not boolean');
            }
        }
        return stream;
    }
};
var CSVDN = /** @class */ (function () {
    function CSVDN(path) {
        var csvdoc = CSVDN.read(path);
        this.content = csvdoc.content;
        this.head = csvdoc.head;
        this.normhead = this.head;
        this.data = csvdoc.data;
        this.rules = {};
        this.normAlgs = DefaultNormalizationAlgs;
    }
    CSVDN.prototype.add = function (key, opts) {
        this.rules[key] = opts;
    };
    CSVDN.prototype.setRules = function (rules) {
        this.rules = rules;
    };
    CSVDN.prototype.getColumn = function (h) {
        var stream = [];
        for (var i = 0; i < this.content.length; i++) {
            stream.push(this.content[i][h]);
        }
        return stream;
    };
    CSVDN.prototype.checkIfLabel = function (h) {
        var isLabel = false;
        for (var i = 0; i < this.content.length; i++) {
            if (Number(this.content[i][h]) != +this.content[i][h]) {
                isLabel = true;
                i = this.content.length;
            }
        }
        return isLabel;
    };
    CSVDN.toString = function (csv_) {
        var csv = [];
        for (var i = 0; i < csv_.length; i++) {
            var stream = [];
            for (var j = 0; j < csv_[i].length; j++) {
                stream.push("" + csv_[i][j]);
            }
            csv.push(stream);
        }
        return csv;
    };
    CSVDN.prototype.log = function (options) {
        if (options === void 0) { options = logDefaults; }
        // Inherit default options for unspecified options
        var opt = {};
        opt = Object.assign(opt, logDefaults);
        for (var c in opt) {
            if (options[c] !== undefined) {
                opt[c] = options[c];
            }
        }
        var csv = this.getFile(opt);
        console.log(csv);
        return csv;
    };
    CSVDN.prototype.getFile = function (options) {
        var mstr = '';
        // Inherit default options for unspecified options
        var opt = {};
        opt = Object.assign(opt, csvExportDefaults);
        if (options !== undefined) {
            for (var c in opt) {
                if (options[c] !== undefined) {
                    opt[c] = options[c];
                }
            }
        }
        var csv_ = opt.normalized ? this.data : this.content;
        var csv = csv_;
        if (opt.header) {
            csv = CSVDN.toString([this.head].concat(csv_));
        }
        var spaces = logger_1.Logger.findLargestString(csv);
        for (var i = 0; i < csv.length; i++) {
            var color = '';
            var colorReset = '';
            if (opt.color && opt.header && i === 0) {
                color = '\x1b[32m';
                colorReset = '\x1b[0m';
            }
            var str = [];
            for (var j = 0; j < csv[i].length; j++) {
                var rtab = '';
                var ltab = '';
                if (opt.tab) {
                    var tab = new Array(spaces[j] - ("" + csv[i][j]).length).join(' ');
                    if (opt.align === 'left') {
                        ltab = tab;
                    }
                    else if (opt.align === 'right') {
                        rtab = tab;
                    }
                }
                str.push("" + ltab + csv[i][j] + rtab);
            }
            mstr += "" + color + str.join("" + opt.join) + colorReset + "\n";
        }
        return mstr;
    };
    CSVDN.prototype.isValid = function () {
        var nonValid = [];
        for (var i = 0; i < this.head.length; i++) {
            if (this.rules[this.head[i]] === undefined) {
                nonValid.push(this.head[i]);
            }
            else if (this.rules[this.head[i]].mode === undefined) {
                nonValid.push(this.head[i]);
            }
        }
        var present = this.head.filter(function (x) {
            return !nonValid.includes(x);
        });
        this.normhead = present;
        if (nonValid.length > 0) {
            logger_1.Logger.warn("These columns were not assigned to a normalization operation\n ( " + nonValid.join(' , ') + " )\n");
        }
        return {
            err: nonValid.length > 0 ? true : false,
            nonValid: nonValid
        };
    };
    CSVDN.prototype.map = function (v, a, b, c, d) {
        return ((v - a) / (b - a)) * (d - c) + c;
    };
    CSVDN.prototype.countLabels = function (col) {
        var cases = [];
        for (var i = 0; i < this.content.length; i++) {
            var value = this.content[i][col];
            if (cases.indexOf(value) === -1) {
                cases.push(value);
            }
        }
        return cases;
    };
    CSVDN.prototype.findLabels = function (col, n) {
        if (n === void 0) { n = -1; }
        var cases = [];
        for (var i = 0; i < this.content.length; i++) {
            var value = this.content[i][col];
            var index = cases.indexOf(value);
            if (index === -1) {
                if (cases.length >= n) {
                    logger_1.Logger.error("This datastream has more labels than expected " + n);
                    return cases;
                }
                ;
                cases.push(value);
            }
        }
        if (cases.length < n) {
            logger_1.Logger.error("This datastream has more labels than expected " + n);
        }
        return cases;
    };
    CSVDN.prototype.applyCSV = function (streams) {
        var data = [];
        var len = 0;
        if (streams.length >= 1) {
            len = streams[0].length;
            for (var i = 0; i < len; i++) {
                var stream = new Array(streams.length).fill(0);
                for (var j = 0; j < streams.length; j++) {
                    stream[j] = streams[j][i];
                }
                data.push(stream);
            }
            this.data = data;
        }
    };
    CSVDN.prototype.normalize = function () {
        var streams = [];
        var valid = this.isValid();
        var nonValid = valid === null || valid === void 0 ? void 0 : valid.nonValid;
        var data = new Array(this.content.length).fill(new Array(this.head.length - nonValid.length).fill(0));
        this.data = data;
        for (var h = 0; h < this.head.length; h++) {
            if (!nonValid.includes(this.head[h])) {
                var rule = this.rules[this.head[h]];
                var datastream = void 0;
                if (Object.keys(this.normAlgs).includes(rule.mode)) {
                    var func = this.normAlgs[rule.mode];
                    datastream = func(this, h);
                }
                else {
                    datastream = new Array(this.content.length).fill(NaN);
                    logger_1.Logger.error("Mode " + rule.mode + " is not a valid normalization operation");
                }
                streams.push(datastream);
            }
        }
        this.applyCSV(streams);
    };
    CSVDN.prototype.getData = function () {
        var data = this.data;
        return data;
    };
    CSVDN.read = function (path) {
        // Read file & format into string jagged array
        var content = fs.readFileSync(path, 'utf8')
            .split('\r\n')
            .map(function (x) { return x.split(','); });
        var head = content.splice(0, 1)[0];
        var s = head.length > 1 ? 1 : 0;
        // Filter out empty lines
        content = content.filter(function (x) {
            return x.length > s;
        });
        var data = new Array(content.length).fill(new Array(head.length).fill(0));
        return {
            content: content,
            head: head,
            data: data
        };
    };
    return CSVDN;
}());
exports.CSVDN = CSVDN;
