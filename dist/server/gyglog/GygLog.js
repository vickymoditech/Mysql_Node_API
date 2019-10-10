/**
 * GyGLog : logger helper class
 */

'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _stackifyLogger = require('stackify-logger');

var _stackifyLogger2 = _interopRequireDefault(_stackifyLogger);

var _environment = require('../config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _UtilityHelper = require('../api/UtilityHelper');

var _UtilityHelper2 = _interopRequireDefault(_UtilityHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('winston-daily-rotate-file');
require('winston-stackify').Stackify;

let GyGLog = class GyGLog {

    /* Init stackify object and logger objects */
    static logInit() {
        const logFormatter = function (options) {
            // Return string will be passed to logger.
            return '[' + _UtilityHelper2.default.padRight(options.level.toUpperCase(), ' ', 5) + '][' + options.timestamp() + ']- ' + (options.message ? options.message : '') + (options.meta && (0, _keys2.default)(options.meta).length ? '\n\t' + (0, _stringify2.default)(options.meta) : '');
        };

        const timestamp = function () {
            return (0, _moment2.default)(new Date()).format('YYYY-MM-DD hh:mm:ss.SSSSSS');
        };

        _stackifyLogger2.default.start({
            apiKey: _environment2.default.gygLogSettings.stackify.apiKey,
            appName: "GYGAPI",
            env: _environment2.default.gygLogSettings.stackify.env
        });

        var filePath = _environment2.default.gygLogSettings.logFile.filePath;
        this.fileLogger = new _winston2.default.Logger({
            transports: [new _winston2.default.transports.DailyRotateFile({
                dirname: filePath,
                filename: './log',
                datePattern: 'yyyy-MM-dd-HH.',
                maxsize: '5242880', //5MB
                localTime: true,
                prepend: true,
                level: this.eLogLevel.silly,
                createTree: true,
                colorize: true,
                prettyPrint: true,
                json: false,
                timestamp: timestamp,
                formatter: logFormatter
            })]
        });

        this.stackifyLogger = new _winston2.default.Logger({
            transports: [new _winston2.default.transports.Stackify({
                storage: _stackifyLogger2.default,
                level: this.eLogLevel.silly,
                colorize: true,
                prettyPrint: true,
                timestamp: timestamp,
                formatter: logFormatter
            })]
        });
    }

    /* Write log to file and/or stackify */

    // { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
    static writeLog(logLevel, uniqueId, message) {
        message = GyGLog.maskPasswordValue(message);
        let isLogToFile = false;
        let isLogToStackify = false;
        if (_environment2.default.gygLogSettings.logFile.threshold && _environment2.default.gygLogSettings.logFile.threshold.toUpperCase() === 'ON') {
            isLogToFile = true;
        }
        if (_environment2.default.gygLogSettings.stackify.threshold && _environment2.default.gygLogSettings.stackify.threshold.toUpperCase() === 'ON') {
            isLogToStackify = true;
        }

        if (uniqueId) {
            if (isLogToFile) {
                this.fileLogger.log(logLevel, '[' + uniqueId + '] ' + message);
            }
            if (isLogToStackify) {
                this.stackifyLogger.log(logLevel, '[' + uniqueId + '] ' + message);
            }
        } else {
            if (isLogToFile) {
                this.fileLogger.log(logLevel, message);
            }
            if (isLogToStackify) {
                this.stackifyLogger.log(logLevel, message);
            }
        }
    }

    /* Write log to file and/or stackify */
    static writeExitLog(logLevel, uniqueId, methodName, request, response) {
        request = GyGLog.maskPasswordValue(request);
        response = GyGLog.maskPasswordValue(response);
        let isLogToFile = false;
        let isLogToStackify = false;
        let SuccessFailMessage = "success...";
        if (logLevel === GyGLog.eLogLevel.error) SuccessFailMessage = "Failed...";

        if (_environment2.default.gygLogSettings.logFile.threshold && _environment2.default.gygLogSettings.logFile.threshold.toUpperCase() === 'ON') {
            isLogToFile = true;
        }
        if (_environment2.default.gygLogSettings.stackify.threshold && _environment2.default.gygLogSettings.stackify.threshold.toUpperCase() === 'ON') {
            isLogToStackify = true;
        }

        if (uniqueId) {
            if (isLogToFile) {
                this.fileLogger.log(logLevel, `[${uniqueId}] [${methodName}] request: ${request}`);
                this.fileLogger.log(logLevel, `[${uniqueId}] [${methodName}] response: ${response}`);
                this.fileLogger.log(GyGLog.eLogLevel.info, `[${uniqueId}] Exiting [${methodName}] ${SuccessFailMessage}`);
            }
            if (isLogToStackify) {
                this.stackifyLogger.log(logLevel, `[${uniqueId}] [${methodName}] request: ${request}`);
                this.stackifyLogger.log(logLevel, `[${uniqueId}] [${methodName}] response: ${response}`);
                this.stackifyLogger.log(GyGLog.eLogLevel.info, `[${uniqueId}] Exiting [${methodName}] ${SuccessFailMessage}`);
            }
        } else {
            if (isLogToFile) {
                this.fileLogger.log(logLevel, message);
            }
            if (isLogToStackify) {
                this.stackifyLogger.log(logLevel, message);
            }
        }
    }

    static maskPasswordValue(message) {
        try {
            //Sample matching log "Password":null
            message = message.replace(/"password":null/i, '"password":"######"');
            //Sample matching log "Password":"123456"
            message = message.replace(/\s*"Password"\s*:\s*(.+?)\s*"/i, '"password":"######"');
            //Sample matching log "Password"="123456"
            message = message.replace(/\s*"Password"\s*=\s*(.+?)\s*"/i, '"password"="######"');
            //Sample matching log Password=123456; (e.g. in connection string)
            message = message.replace(/\s*Password\s*=\s*(.+?)\s*(;|\s|$)/i, 'password=######');
            return message;
        } catch (err) {
            return message;
        }
    }
};

// export the class

GyGLog.eLogLevel = {
    error: 'error',
    warn: 'warn',
    info: 'info',
    verbose: 'verbose',
    debug: 'debug',
    silly: 'silly'
};
module.exports = GyGLog;
//# sourceMappingURL=GygLog.js.map
