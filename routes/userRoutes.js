const express = require('express');
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch('/updateMyPassword', authController.protect, authController.updatePassword);

router.patch(
    '/updateMe',
    authController.protect,
    userController.uploadUserPhoto,
    userController.updateMe);

router.delete('/deleteMe', authController.protect, userController.deleteMe);

router
    .route('/')
    .get(authController.protect, userController.getAllUsers)
    .post(authController.protect, userController.createUser);

    router
    .route('/:id')
    .get(authController.protect, userController.getUser)
    .patch(authController.protect, userController.updateUser);

module.exports = router;    