'use strict';

let express = require('express');
let controller = require('../controller/thing.controller');

let router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);

module.exports = router;
//# sourceMappingURL=thing.routes.js.map
