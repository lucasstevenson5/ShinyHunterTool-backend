const { Model } = require('sequelize');
const User = require('./user.model')

module.exports = (sequelize, DataTypes) => {
    class Pokemon extends Model {
      static associate(models) {
        console.log(models)
        Pokemon.belongsTo(models.user, { foreignKey: "userId" });
      };
    };

    Pokemon.init({
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      userId: DataTypes.INTEGER
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