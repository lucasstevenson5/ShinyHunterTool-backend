const db = require("../models");
const Pokedex = db.pokedex;
const Op = db.Sequelize.Op;
const axios = require('axios');
var fullPokedex = [];

// Create and Save a new Pokemon
exports.create = (req, res) => {
  /*if (!req.body.name) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    return;
  }*/

  console.log(fullPokedex);
  for (let i=0; i < fullPokedex.length; i++) {
    const pokedex = {
        name: fullPokedex[i].name
    };

    Pokedex.create(pokedex)
        .then(newPokedex => {
            
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Pokemon"
            });
        });
  }
  
}; 

// Retrieve all Pokemon from the database.
exports.findAll = (req, res) => {
  console.log(req.body);
  const url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";

  axios.get(url)
    .then(pokedex => {
        res.render("migrate.ejs", {
            pokedex: pokedex
        });
        fullPokedex = pokedex.data.results;
        console.log(fullPokedex);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving pokemon"
        });
    });
};