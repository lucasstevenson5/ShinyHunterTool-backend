const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Pokemon, { foreignKey: "userId" })
        }
    };

    User.init({
        name: Sequelize.STRING,
        username: Sequelize.STRING,
        password: Sequelize.STRING
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