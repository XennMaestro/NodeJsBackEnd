const express = require('express');
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router
    .route('/')
    .get(authController.protect, userController.getAllUsers)
    .post(authController.protect, userController.createUser);

    router
    .route('/:id')
    .get(authController.protect, userController.getUser)
    .delete(authController.protect, userController.deleteUser)
    .patch(authController.protect, userController.updateUser);

module.exports = router;    