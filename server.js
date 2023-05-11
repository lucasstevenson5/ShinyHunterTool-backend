const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./models");

//var testAPIRouter = require("./routes/testAPI");
//app.use("/testAPI", testAPIRouter);

/*db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
*/
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  useRoutes()
});

var corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Shiny Hunter application." });
});

function useRoutes() {
  require("./routes/pokemon.routes")(app);
  require("./routes/pokedex.routes")(app);
  require("./routes/user.routes")(app);
  require("./routes/testAPI")(app);
}



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});