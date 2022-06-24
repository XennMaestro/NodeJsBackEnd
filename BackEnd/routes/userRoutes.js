const express = require('express');
const tourController = require('./../controllers/userController');

const router = express.Router();

router
    .route('/')
    .get(tourController.getAllUsers)
    .post(tourController.createUser);

    router
    .route('/:id')
    .get()
    .post();

module.exports = router;    