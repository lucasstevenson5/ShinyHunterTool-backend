const { Model } = require('sequelize');
const Pokemon = require('./pokedex.model');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.pokemon, { foreignKey: "userId" })
        }
    };

    User.init({
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'user'
    })

    /*const User = sequelize.define("user", {
      name: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });

    User.associate = function(models) {
        User.hasMany(models.Pokemon, {
            foreignKey: "userId"
        })
    }*/
  
    return User;
  };