module.exports = app => {
    const pokemon = require("../controllers/pokemon.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Pokemon
    router.post("/", pokemon.create);
  
    // Retrieve all Pokemon
    router.get("/", pokemon.findAll);
  
    // Retrieve a single Pokemon with id
    router.get("/:id", pokemon.findOne);
  
    // Update a Pokemon with id
    router.put("/:id", pokemon.update);
  
    // Delete a Pokemon with id
    router.delete("/:id", pokemon.delete);
  
    // Delete All pokemon
    router.delete("/", pokemon.deleteAll);
  
    app.use('/api/pokemon', router);
  };