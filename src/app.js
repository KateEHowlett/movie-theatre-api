const express = require("express");
const app = express();
const {User} = require("../models/user")
const {db} = require("../db/connection");

app.get("/users", async (request,response) => {
    let users = await User.findAll({});
    response.json(users);
})


module.exports = {app};