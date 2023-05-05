const db = require("../models");
const testAPI = db.testAPI;

exports.API = (req, res) => {
    
    res.send("Test API is working properly");
    console.log("Hello, you made it to controller")
  };