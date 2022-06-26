const express = require('express');
const tourController = require("../controllers/userController");

const router = express.Router();

router
    .route('/')
    .get(tourController.getAllUsers)
    .post(tourController.createUser);

    router
    .route('/:id')
    .get(tourController.getUser)
    .delete(tourController.deleteUser)
    .patch(tourController.updateUser);

module.exports = router;    