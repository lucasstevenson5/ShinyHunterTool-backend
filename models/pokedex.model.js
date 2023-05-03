module.exports = (sequelize, Sequelize) => {
    const Pokedex = sequelize.define("pokedex", {
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Pokedex;
  };