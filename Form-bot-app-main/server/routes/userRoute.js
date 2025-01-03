const express = require('express');
const router = express.Router();
const User = require('../model/user');
const { registerUser, loginUser, updateUser } = require('../controllers/userController');
const validateNewUser = require('../middleware/validateNewUser');
const verifyToken = require('../middleware/verifyToken')


router.post('/register',validateNewUser,registerUser);
router.post('/login', loginUser);
router.put('/update', verifyToken, updateUser);
module.exports = router;