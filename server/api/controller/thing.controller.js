/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 * POST    /api/things              ->  create
 * GET     /api/things/:id          ->  show
 */

import {Thing, User, Comment, Post} from '../../sqldb/index';
import {getUid} from "../../commonHelper/index";
const GyGLog = require( "../../gyglog/GygLog");
import httpResponseCode from "../../commonHelper/httpResponseStatusHelper";

// Gets a list of Things
export function index(req, res, next) {
    const uniqueId = getUid();
    const methodName = 'GET /api/things';
    try {
        GyGLog.writeLog(GyGLog.eLogLevel.debug, uniqueId, `${methodName} Entering...`);
        Thing.findAll().then((getAllThings) => {
            GyGLog.writeLog(GyGLog.eLogLevel.info, uniqueId, `getAllThings DB: ${JSON.stringify(getAllThings)}`);
            if (getAllThings) {
                GyGLog.writeExitLog(GyGLog.eLogLevel.info, uniqueId, methodName, "GET", JSON.stringify(getAllThings));
                return res.status(httpResponseCode.statusCode.Success).json(getAllThings);
            }
        }).catch((error) => {
            GyGLog.writeExitLog(GyGLog.eLogLevel.error, uniqueId, methodName, "GET", error.stack.toString());
            next(error);
        });
    } catch (error) {
        GyGLog.writeExitLog(GyGLog.eLogLevel.error, uniqueId, methodName, "GET", error.stack.toString());
        next(error);
    }
}

// Gets a single Thing from the DB
export function show(req, res, next) {
    const uniqueId = getUid();
    const methodName = 'GET /api/things';
    let request = {
        id: req.params.id
    };
    GyGLog.writeLog(GyGLog.eLogLevel.debug, uniqueId, `${methodName} Entering...`);
    GyGLog.writeLog(GyGLog.eLogLevel.debug, uniqueId, `${methodName} request...${request}`);
    try {
        return Thing.find({
            where: {
                _id: req.params.id
            }
        }).then((response) => {
            GyGLog.writeLog(GyGLog.eLogLevel.info, uniqueId, `response DB: ${JSON.stringify(response)}`);
            if (response) {
                GyGLog.writeExitLog(GyGLog.eLogLevel.info, uniqueId, methodName, "GET", JSON.stringify(response));
                return res.status(httpResponseCode.statusCode.Success).json(response);
            }
        }).catch((error) => {
            GyGLog.writeExitLog(GyGLog.eLogLevel.error, uniqueId, methodName, "GET", error.stack.toString());
            next(error);
        });
    } catch (error) {
        GyGLog.writeExitLog(GyGLog.eLogLevel.error, uniqueId, methodName, "GET", error.stack.toString());
        next(error);
    }
}


export function getUser(req, res, next) {
    const uniqueId = getUid();
    const methodName = 'GET /api/things/Users';
    try {
        GyGLog.writeLog(GyGLog.eLogLevel.debug, uniqueId, `${methodName} Entering...`);
        return User.findAll({
            include: [{
                model: Post,
                include: [{
                    model: Comment
                }]
            }],
            where: {
                id: 1
            }
        }).then((getAllUsers) => {
            GyGLog.writeLog(GyGLog.eLogLevel.info, uniqueId, `getAllUsers DB: ${JSON.stringify(getAllUsers)}`);
            if (getAllUsers) {
                GyGLog.writeExitLog(GyGLog.eLogLevel.info, uniqueId, methodName, "GET", JSON.stringify(getAllUsers));
                return res.status(httpResponseCode.statusCode.Success).json(getAllUsers);
            }
        }).catch((error) => {
            GyGLog.writeExitLog(GyGLog.eLogLevel.error, uniqueId, methodName, "GET", error.stack.toString());
            next(error);
        });
    } catch (error) {
        GyGLog.writeExitLog(GyGLog.eLogLevel.error, uniqueId, methodName, "GET", error.stack.toString());
        next(error);
    }
}
