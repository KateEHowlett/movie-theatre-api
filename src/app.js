const express = require("express");
const app = express();
const {User, Show} = require("../models/index")
const {db} = require("../db/connection");

app.get("/users", async (request,response) => {
    let users = await User.findAll({});
    response.json(users);
})

app.get("/users/:id", async (request,response) => {
    const id = request.params.id;
    const user = await User.findByPk(id);
    response.json(user)
})

app.get("/users/:id/watched", async (request,response) => {
    const userID = request.params.id;
    const user = await User.findByPk(userID);
    const shows = await user.getShows({joinTableAttributes:[]});
    response.json(shows);
})

app.put("/users/:id/watched/:showid", async (request,response) => {
    const user = await User.findByPk(request.params.id);
    await user.addShow(request.params.showid);
    const shows = await user.getShows({joinTableAttributes:[]});
    response.json(shows)
})


module.exports = {app};