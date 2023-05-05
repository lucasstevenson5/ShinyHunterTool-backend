module.exports = (sequelize, Sequelize) => {
    const Pokedex = sequelize.define("pokedex", {
      name: {
        type: Sequelize.STRING
      },
      img: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      stats: {
        type: Sequelize.STRING
      },
      primaryAbility: {
        type: Sequelize.STRING
      }
    });
  
    return Pokedex;
  };