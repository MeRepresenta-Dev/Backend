const express = require('express');
const router = express.Router();
const userController = require('../controllers/controller');

router.get('/', userController.listUser);
router.post('/', userController.createUser);

module.exports = router;