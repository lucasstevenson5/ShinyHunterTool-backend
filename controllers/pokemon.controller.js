const db = require("../models");
const Pokemon = db.pokemon;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
    return;
  }

  const pokemon = {
    name: req.body.name,
    type: req.body.type
  };

  Pokemon.create(pokemon)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Pokemon"
        });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}` } } : null;

  Pokemon.findAll({ where: condition})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving pokemon"
        });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Pokemon.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
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

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Pokemon.update(req.body, {
    where: { id: id }
  })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Pokemon was updated successfully."
            });
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

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Pokemon.destroy({
    where: { id: id }
  })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Pokemon was deleted successfully"
            });
        } else {
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

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Pokemon.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
        res.send({
            message: `${nums} Pokemon were deleted successfully`
        })
    })
};