module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const pokemon = require("../controllers/pokemon.controller.js");



    // Create a new Pokemon
    router.post("/", pokemon.create);

    // Retrieve all Pokemon
    router.get("/", pokemon.findAll);

    // Retrieve a single Pokemon with id
    router.get("/:id", pokemon.findOne);

    // Update a Pokemon with id
    router.post("/:id", pokemon.update);

    // Delete a Pokemon with id
    router.post("/:id", pokemon.delete);

    app.use('/pokemon', router);

    module.exports = router;
};