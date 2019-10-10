"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

exports.index = index;
exports.show = show;

var _index = require("../../sqldb/index");

var _index2 = require("../../commonHelper/index");

var _GygLog = require("../../gyglog/GygLog");

var _GygLog2 = _interopRequireDefault(_GygLog);

var _httpResponseStatusHelper = require("../../commonHelper/httpResponseStatusHelper");

var _httpResponseStatusHelper2 = _interopRequireDefault(_httpResponseStatusHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Gets a list of Things
/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 * POST    /api/things              ->  create
 * GET     /api/things/:id          ->  show
 */

function index(req, res, next) {
    const uniqueId = (0, _index2.getUid)();
    const methodName = 'GET /api/things';
    try {
        _GygLog2.default.writeLog(_GygLog2.default.eLogLevel.debug, uniqueId, `${methodName} Entering...`);
        _index.Thing.findAll().then(getAllThings => {
            _GygLog2.default.writeLog(_GygLog2.default.eLogLevel.info, uniqueId, `getAllThings DB: ${(0, _stringify2.default)(getAllThings)}`);
            if (getAllThings) {
                _GygLog2.default.writeExitLog(_GygLog2.default.eLogLevel.info, uniqueId, methodName, "GET", (0, _stringify2.default)(getAllThings));
                return res.status(_httpResponseStatusHelper2.default.statusCode.Success).json(getAllThings);
            }
        }).catch(error => {
            _GygLog2.default.writeExitLog(_GygLog2.default.eLogLevel.error, uniqueId, methodName, "GET", error.stack.toString());
            next(error);
        });
    } catch (error) {
        _GygLog2.default.writeExitLog(_GygLog2.default.eLogLevel.error, uniqueId, methodName, "GET", error.stack.toString());
        next(error);
    }
}

// Gets a single Thing from the DB
function show(req, res, next) {
    const uniqueId = (0, _index2.getUid)();
    const methodName = 'GET /api/things';
    let request = {
        id: req.params.id
    };
    _GygLog2.default.writeLog(_GygLog2.default.eLogLevel.debug, uniqueId, `${methodName} Entering...`);
    _GygLog2.default.writeLog(_GygLog2.default.eLogLevel.debug, uniqueId, `${methodName} request...${request}`);
    try {
        return _index.Thing.find({
            where: {
                _id: req.params.id
            }
        }).then(response => {
            _GygLog2.default.writeLog(_GygLog2.default.eLogLevel.info, uniqueId, `response DB: ${(0, _stringify2.default)(response)}`);
            if (response) {
                _GygLog2.default.writeExitLog(_GygLog2.default.eLogLevel.info, uniqueId, methodName, "GET", (0, _stringify2.default)(response));
                return res.status(_httpResponseStatusHelper2.default.statusCode.Success).json(response);
            }
        }).catch(error => {
            _GygLog2.default.writeExitLog(_GygLog2.default.eLogLevel.error, uniqueId, methodName, "GET", error.stack.toString());
            next(error);
        });
    } catch (error) {
        _GygLog2.default.writeExitLog(_GygLog2.default.eLogLevel.error, uniqueId, methodName, "GET", error.stack.toString());
        next(error);
    }
}
//# sourceMappingURL=thing.controller.js.map
