import jwt from 'jsonwebtoken';
import {jwtdata} from '../../commonHelper';
import Joi from 'joi';


let timePeriode = Joi.object().keys({
    start_time: Joi.string().required(),
    end_time: Joi.string().required()
});

let service = Joi.object().keys({
    enabled: Joi.boolean().required(),
    time_periods: Joi.array().items(timePeriode).required(),
    day_of_week: Joi.string().required()
});

let storeList = Joi.object().keys({
    uuid: Joi.string().uuid().required()
});


export default {

    validateAuthorization: function (req, res, next) {
        // check header or url parameters or post parameters for token
        var authorizationHeader = req.headers['authorization'];
        var token = '';
        if (authorizationHeader) {
            var headerParts = authorizationHeader.trim().split(' ');
            if (headerParts[0].toLowerCase() === 'bearer') {
                token = headerParts[headerParts.length - 1];
            }
            else {
                var statusCode = 401;
                return res.status(statusCode).json({
                    user_msg: 'Failed to authenticate token.',
                    dev_msg: 'Failed to authenticate token.',
                });
            }
        }

        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, jwtdata.jwtSecretKey, function (err, decoded) {
                if (err) {
                    var statusCode = 401;
                    return res.status(statusCode).json({
                        user_msg: 'Failed to authenticate token.',
                        dev_msg: 'Failed to authenticate token.',
                    });
                } else {
                    // if everything is good, save to request for use in other routes
                    if (decoded.user.role.toString().toLowerCase() == "admin") {
                        req.decoded = decoded;
                        next();
                    } else {
                        var statusCode = 403;
                        return res.status(statusCode).json({
                            user_msg: 'UnAuthorized user.',
                            dev_msg: 'UnAuthorized user.',
                        });
                    }
                }
            });
        } else {
            // if there is no token
            // return an error
            var statusCode = 401;
            return res.status(statusCode).json({
                user_msg: 'No token provided.',
                dev_msg: 'No token provided.',
            });
        }
    },

    postRemoveMenu: {
        body: {
            menu_id: Joi.string().required()
        }
    },

    updateUser: {
        body: {
            first_name: Joi.string().regex(/^[a-zA-Z]{3,30}$/).required(),
            last_name: Joi.string().regex(/^[a-zA-Z]{3,30}$/).required(),
            mobile_number: Joi.string().regex(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/).required(),
            password: Joi.string().required(),
            confirm_password: Joi.string().required().valid(Joi.ref('password')),
            block: Joi.boolean().required(),
        }
    },

    login: {
        body: {
            userId: Joi.string().required(),
            password: Joi.string().required(),
        }
    }


    getStore: {
        body: {
            uuid: Joi.string().required()
        }
    },

    addStore: {
        body: {
            days_hours_base: Joi.object({
                service_availability: Joi.array().items(service).required(),
                subtitle: Joi.string().required(),
            }).required(),
            uuid: Joi.string().uuid().required(),
            name: Joi.string().required(),
            has_breakfast: Joi.boolean().required(),
            state: Joi.string().required(),
            menu_id: Joi.string().required(),
        }
    },

    //Inner Validation
    editDayTime: {
        body: {
            days_hours_base: Joi.object({
                service_availability: Joi.array().items(service).required(),
                subtitle: Joi.string().required(),
            }).required(),
            uuid: Joi.string().uuid().required(),
        }
    },

    createStoreMenu: {
        body: {
            uuid: Joi.string().uuid().required(),
            menu_id: Joi.string().uuid().required(),
        }
    },

    listByMenu: {
        body: {
            menu_id: Joi.string().uuid().required(),
        }
    },

    deleteStore: {
        body: {
            uuid: Joi.string().uuid().required(),
        }
    },

    sendMenuToUber: {
        body: {
            uuid: Joi.string().uuid().required(),
        }
    },

    setIntegration: {
        body: {
            uuid: Joi.string().uuid().required(),
            pos_integration_enabled: Joi.boolean().required(),
            order_release_enabled: Joi.boolean().required()
        }
    },

    //Inner Validation
    editStoresByMenu: {
        body: {
            menu_id: Joi.string().uuid().required(),
            stores: Joi.array().items(storeList).required()
        }
    }


};
