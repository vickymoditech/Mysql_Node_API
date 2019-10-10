'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*eslint no-process-env:0*/

const env = exports.env = process.env.NODE_ENV;
const port = exports.port = process.env.PORT || 9000;
// List of user roles
const userRoles = exports.userRoles = ['guest', 'user', 'admin'];

exports.default = {
    env,
    port,
    userRoles
};
//# sourceMappingURL=shared.js.map
