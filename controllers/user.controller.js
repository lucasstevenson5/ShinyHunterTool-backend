const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.signup = (req,res) => {
    res.render('signup.ejs', {
        error: false
    })
}

// Create and Save a new User
exports.create = (req, res) => {
    const user = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    }
    User.create(user)
    .then(newUser => {
        console.log(newUser);
        const token = jwt.sign(
            {
                id: newUser.id,
                username: newUser.username
            },
            process.env.JWT_KEY,
            {
                expiresIn: '30 days'
            }
        );
        res.cookie('jwt', token)
        res.redirect("/user/profile")
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Error occurred while creating new user"
        })
    })
}

exports.findUser = (req, res) => {
    console.log(req.headers.cookie)
    var cookie = req.headers.cookie
    cookie = cookie.slice(4);
    console.log(cookie)
    var decoded = jwt.verify(cookie, process.env.JWT_KEY);

    User.findByPk(decoded.id)
    .then(showProfile => {
        res.render("profile.ejs", {
            user: showProfile
        });
    }) 
};