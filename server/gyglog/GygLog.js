/**
 * GyGLog : logger helper class
 */

'use strict';

const SimpleNodeLogger = require('simple-node-logger');

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
    d = new Date();
    opts = null;

    /* Init stackify object and logger objects */
    static logInit() {
        this.d = new Date();
        this.opts = {
            logFilePath: `error_Log_${this.d.getHours()}_${this.d.getMinutes()}.log`,
            timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
        };
        this.fileLogger = SimpleNodeLogger.createSimpleLogger(this.opts);

    }

    static commonWriteLog(logLevel, uniqueId, message) {
        switch (logLevel) {
            case "error":
                this.fileLogger.error('[' + uniqueId + '] ' + message);
                break;
            case "warn":
                this.fileLogger.info('[' + uniqueId + '] ' + message);
                break;
            case "info":
                this.fileLogger.info('[' + uniqueId + '] ' + message);
                break;
            case "verbose":
                this.fileLogger.error('[' + uniqueId + '] ' + message);
                break;
            case "debug":
                this.fileLogger.info('[' + uniqueId + '] ' + message);
                break;
            case "silly":
                this.fileLogger.error('[' + uniqueId + '] ' + message);
                break;
        }
    }

    static commonWriteLogWithoutId(logLevel, message) {
        switch (logLevel) {
            case "error":
                this.fileLogger.error(message);
                break;
            case "warn":
                this.fileLogger.info(message);
                break;
            case "info":
                this.fileLogger.info(message);
                break;
            case "verbose":
                this.fileLogger.error(message);
                break;
            case "debug":
                this.fileLogger.info(message);
                break;
            case "silly":
                this.fileLogger.error(message);
                break;
        }
    }


    /* Write log to file and/or stackify */
    static writeLog(logLevel, uniqueId, message) {
        if (uniqueId) {
            this.commonWriteLog(logLevel, uniqueId, message);
        } else {
            this.commonWriteLogWithoutId(logLevel, message);
        }
    }

    /* Write log to file and/or stackify */
    static writeExitLog(logLevel, uniqueId, methodName, request, response) {
        let SuccessFailMessage = "success...";
        if (logLevel === GyGLog.eLogLevel.error)
            SuccessFailMessage = "Failed...";

        if (uniqueId) {
            this.fileLogger.info(`[${uniqueId}] [${methodName}] request: ${request}`);
            this.fileLogger.info(`[${uniqueId}] [${methodName}] response: ${response}`);
            this.fileLogger.info(`[${uniqueId}] Exiting [${methodName}] ${SuccessFailMessage}`);
        }
        else {
            this.commonWriteLogWithoutId(logLevel, message);
        }
    }


}

// export the class
module.exports = GyGLog;
