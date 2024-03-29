"use strict";

let httpResponseCode = class httpResponseCode {};

// export the class

httpResponseCode.statusCode = {
    Success: 200,
    Created: 201,
    Accepted: 202,
    NotFound: 404,
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502
};
module.exports = httpResponseCode;
//# sourceMappingURL=httpResponseStatusHelper.js.map
