const db = require("../models");
const Pokemon = db.pokemon;
const Op = db.Sequelize.Op;

require('dotenv').config();
const jwt = require('jsonwebtoken');

// Create and Save a new Pokemon
exports.create = (req, res) => {
  var cookie = req.headers.cookie
  cookie = cookie.slice(4);
  console.log(cookie)
  var decoded = jwt.verify(cookie, process.env.JWT_KEY);
  req.body.userId = decoded.id
  const pokemon = {
    name: req.body.name,
    type: req.body.type,
    userId: req.body.userId
  };

  Pokemon.create(pokemon)
    .then(newPokemon => {
        res.redirect("/user/profile")
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Pokemon"
        });
    });
};

// Retrieve all Pokemon from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}` } } : null;

  Pokemon.findAll({ 
    //where: condition,
    order: [
        ['id', 'ASC']
    ]
  })
    .then(data => {
        res.render("index.ejs", {
            pokemon: data
        });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving pokemon"
        });
    });
};

// Find a single Pokemon with an id
exports.findOne = (req, res) => {
  Pokemon.findByPk(req.params.id)
    .then(showPokemon => {
        if (showPokemon) {
            res.render("show.ejs", {
                pokemon: showPokemon
            })
        } else {
            res.status(404).send({
                message: `Cannot find Pokemon with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Error retrieving Pokemon with id=${id}.`
        });
    });
};

// Update a Pokemon by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Pokemon.update(req.body, {
    where: { id: id }
  })
    .then(num => {
        if (num == 1) {
            res.redirect(`/pokemon/${id}`);
        } else {
            res.send({
                message: `Cannot update Pokemon with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Error updating Pokemon with id=${id}.`
        })
    })
};

// Delete a Pokemon with the specified id in the request
exports.delete = (req, res) => {
  Pokemon.destroy({
    where: { id: req.params.id }
  })
    .then(num => {
        if (num == 1) {
            console.log("here")
            res.redirect("/pokemon");
        } else {
            console.log("there")
            res.send({
                message: `Cannot delete Pokemon with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Error deleting Pokemon with id=${id}.`
        });
    });
};