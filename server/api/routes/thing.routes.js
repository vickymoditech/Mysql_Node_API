let express = require('express');
let controller = require('../controller/thing.controller');

let router = express.Router();

router.get('/', controller.index);
router.get('/user', controller.getUser);
router.get('/:id', controller.show);


module.exports = router;
