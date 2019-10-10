'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.jwtdata = undefined;
exports.getUid = getUid;
exports.getHomeDir = getHomeDir;
exports.setCache = setCache;
exports.getCache = getCache;

var _environment = require('../config/environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let homeDir = require('homedir');

const uuidv1 = require('uuid/v1');
const NodeCache = require("node-cache");
let moment = require('moment-timezone');
const myCache = new NodeCache();

const jwtdata = exports.jwtdata = { jwtSecretKey: '6XHvbHlC}7qPY#P[' };

function getUid() {
    return uuidv1();
}

function getHomeDir() {
    return homeDir();
}

function setCache(key, value) {
    myCache.set(key, value, 10000);
}

function getCache(key) {
    let value = myCache.get(key);
    if (value === undefined) {
        return null;
    }
    return value;
}
//# sourceMappingURL=index.js.map
