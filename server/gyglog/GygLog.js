/**
 * GyGLog : logger helper class
 */

'use strict';

import moment from 'moment';
import winston from 'winston';
import stackify from 'stackify-logger';
import config from '../config/environment';
import UtilityHelper from '../api/utilityHelper';

require('winston-daily-rotate-file');
require('winston-stackify').Stackify;

class GyGLog {
    // { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
    static eLogLevel = {
        error: 'error',
        warn: 'warn',
        info: 'info',
        verbose: 'verbose',
        debug: 'debug',
        silly: 'silly'
    };
    static fileLogger;
    static stackifyLogger;

    /* Init stackify object and logger objects */
    static logInit() {
        const logFormatter = function (options) {
            // Return string will be passed to logger.
            return '[' + UtilityHelper.padRight(options.level.toUpperCase(), ' ', 5) + '][' + options.timestamp() + ']- ' +
                (options.message ? options.message : '') +
                (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '' );
        };

        const timestamp = function () {
            return moment(new Date()).format('YYYY-MM-DD hh:mm:ss.SSSSSS');
        };

        stackify.start({
            apiKey: config.gygLogSettings.stackify.apiKey,
            appName: "GYGAPI",
            env: config.gygLogSettings.stackify.env
        });

        var filePath = config.gygLogSettings.logFile.filePath;
        this.fileLogger = new (winston.Logger)({
            transports: [
                new (winston.transports.DailyRotateFile)({
                    dirname: filePath,
                    filename: './log',
                    datePattern: 'yyyy-MM-dd-HH.',
                    maxsize: '5242880',  //5MB
                    localTime: true,
                    prepend: true,
                    level: this.eLogLevel.silly,
                    createTree: true,
                    colorize: true,
                    prettyPrint: true,
                    json: false,
                    timestamp: timestamp,
                    formatter: logFormatter
                })
            ]
        });

        this.stackifyLogger = new (winston.Logger)({
            transports: [
                new (winston.transports.Stackify)({
                    storage: stackify,
                    level: this.eLogLevel.silly,
                    colorize: true,
                    prettyPrint: true,
                    timestamp: timestamp,
                    formatter: logFormatter
                })
            ]
        });
    }

    /* Write log to file and/or stackify */
    static writeLog(logLevel, uniqueId, message) {
        message = GyGLog.maskPasswordValue(message);
        let isLogToFile = false;
        let isLogToStackify = false;
        if (config.gygLogSettings.logFile.threshold && config.gygLogSettings.logFile.threshold.toUpperCase() === 'ON') {
            isLogToFile = true;
        }
        if (config.gygLogSettings.stackify.threshold && config.gygLogSettings.stackify.threshold.toUpperCase() === 'ON') {
            isLogToStackify = true;
        }

        if (uniqueId) {
            if (isLogToFile) {
                this.fileLogger.log(logLevel, '[' + uniqueId + '] ' + message);
            }
            if (isLogToStackify) {
                this.stackifyLogger.log(logLevel, '[' + uniqueId + '] ' + message);
            }
        }
        else {
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
        if (logLevel === GyGLog.eLogLevel.error)
            SuccessFailMessage = "Failed...";

        if (config.gygLogSettings.logFile.threshold && config.gygLogSettings.logFile.threshold.toUpperCase() === 'ON') {
            isLogToFile = true;
        }
        if (config.gygLogSettings.stackify.threshold && config.gygLogSettings.stackify.threshold.toUpperCase() === 'ON') {
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
        }
        else {
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
        }
        catch (err) {
            return message;
        }
    }
}

// export the class
module.exports = GyGLog;
