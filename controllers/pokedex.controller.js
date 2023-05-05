const db = require("../models");
const Pokedex = db.pokedex;
const Op = db.Sequelize.Op;
const axios = require('axios');
var fullPokedex = [];
var backendPokedex = [];

// Create and Save all pokemon exported from external API
exports.create = (req, res) => {
  /*if (!req.body.name) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    return;
  }*/

  console.log(fullPokedex);
  for (let i=0; i < fullPokedex.length; i++) {
    
        console.log(backendPokedex[i].data.stats);
        const pokedex = {
            name: backendPokedex[i].data.name,
            img: backendPokedex[i].data.sprites.front_shiny,
            type: backendPokedex[i].data.types[0].type.name,
            //stats: backendPokedex[i].data.stats,
            primaryAbility: backendPokedex[i].data.abilities[0].ability.name
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
  res.redirect("../pokemon")
  
}; 

// Retrieve all Pokemon from the external api and store to variable.
exports.findAll = (req, res) => {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";

  axios.get(url)
    .then(pokedex => {
        res.render("migrate.ejs", {
            pokedex: pokedex
        });
        fullPokedex = pokedex.data.results;

        for (let i=0; i < fullPokedex.length; i++) {
            axios.get(fullPokedex[i].url)
                .then(pokemon => {
                    backendPokedex[i] = pokemon;
                })
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving pokemon"
        });
    });
};

exports.findAllPokemon = (req, res) => {

    Pokedex.findAll({ 
        //where: condition,
        order: [
            ['id', 'ASC']
        ]
    })
        .then(data => {
            console.log(data[1].dataValues)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pokemon"
            });
        });
};