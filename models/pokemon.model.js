module.exports = (sequelize, Sequelize) => {
    const Pokemon = sequelize.define("pokemon", {
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      }
    });
  
    return Pokemon;
  };