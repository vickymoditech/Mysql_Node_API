import config from '../config/environment';
let homeDir = require('homedir');

const uuidv1 = require('uuid/v1');
const NodeCache = require("node-cache");
let moment = require('moment-timezone');
const myCache = new NodeCache();

export const jwtdata = {jwtSecretKey: '6XHvbHlC}7qPY#P['};

export function getUid() {
    return uuidv1();
}

export function getHomeDir() {
    return homeDir();
}

export function setCache(key, value) {
    myCache.set(key, value, 10000);
}

export function getCache(key) {
    let value = myCache.get(key);
    if (value === undefined) {
        return null;
    }
    return value;
}
