const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    class Pokemon extends Model {
      static associate(models) {
        Pokemon.belongsTo(models.User, {
          foreignKey: "userId"
        })
      }
    };

    Pokemon.init({
      name: Sequelize.STRING,
      type: Sequelize.STRING
    }, {
      sequelize,
      modelName: "pokemon"
    })

    /*const Pokemon = sequelize.define("pokemon", {
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      }
    });

    Pokemon.associate = function(models) {
      Pokemon.belongsTo(models.User, {
        foreignKey: "userId"
      })
    }*/
  
    return Pokemon;
  };