module.exports = app => {

    const express = require('express');
    const router = express.Router();
    const testAPI = require("../controllers/testAPI.js");

    router.get("/", testAPI.API);

    app.use('/testAPI', router);
    module.exports = router;

};