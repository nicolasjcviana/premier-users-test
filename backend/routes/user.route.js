module.exports = app => {
    const userController = require('../controller/user.controller.js');
    var router = require("express").Router();

    router.post("/", userController.create);
    router.get("/", userController.findAll);
    router.get("/:id", userController.findOne);
    router.put("/:id", userController.update);
    router.delete("/:id", userController.delete);

    app.use('/api/users', router);
};