module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const pokedex = require("../controllers/pokedex.controller.js");



    // Create a new Pokemon
    router.post("/migrate", pokedex.create);

    // Retrieve all Pokemon for one time migration to Pokedex backend
    router.get("/migrate", pokedex.findAll);

    // Retrieve a single Pokemon with id
    // router.get("/:id", pokemon.findOne);

    // Update a Pokemon with id
    // router.post("/:id", pokemon.update);

    // Delete a Pokemon with id
    // router.post("/:id", pokemon.delete);

    app.use('/pokedex', router);

    module.exports = router;
};