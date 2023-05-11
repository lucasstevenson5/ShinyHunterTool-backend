module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const user = require("../controllers/user.controller");



    // Create a new Pokemon
    router.post("/signup", user.create);

    router.get("/signup", user.signup);

    router.get("/profile", user.findUser);

    // Retrieve a single Pokemon with id
    // router.get("/:id", pokemon.findOne);

    // Update a Pokemon with id
    // router.post("/:id", pokemon.update);

    // Delete a Pokemon with id
    // router.post("/:id", pokemon.delete);

    app.use('/user', router);

    module.exports = router;
};