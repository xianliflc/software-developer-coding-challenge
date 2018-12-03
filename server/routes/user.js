var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/* list all users */
// GET api/user/
router.get('/', userController.list);

module.exports = router;