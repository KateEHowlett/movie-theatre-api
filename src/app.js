const express = require("express");
const app = express();
const {User, Show} = require("../models/index")
const {db} = require("../db/connection");

//User related logic
app.get("/users", async (request,response) => {
    let users = await User.findAll({});
    response.json(users);
})

app.get("/users/:userid", async (request,response) => {
    const id = request.params.userid;
    const user = await User.findByPk(id);
    response.json(user)
})

app.get("/users/:userid/watched", async (request,response) => {
    const userID = request.params.userid;
    const user = await User.findByPk(userID);
    const shows = await user.getShows({joinTableAttributes:[]});
    response.json(shows);
})

app.put("/users/:userid/watched/:showid", async (request,response) => {
    const user = await User.findByPk(request.params.userid);
    await user.addShow(request.params.showid);
    const shows = await user.getShows({joinTableAttributes:[]});
    response.json(shows)
})

// Show related logic
app.get("/shows", async (request,response) => {
    let shows = await Show.findAll({});
    response.json(shows);
})

app.get("/shows/:showid", async (request,response) => {
    const showid = request.params.showid;
    const show = await Show.findByPk(showid);
    response.json(show)
})

app.get("/shows/genres/:genre", async (request,response) => {
    const genre = request.params.genre;
    const show = await Show.findAll({where: 
        {genre:genre
        }
    });
    response.json(show)
})

app.get("/shows/rating/:showid/:rating", async (request,response) => {
    await Show.update({rating:request.params.rating},{
        where:{
            id:request.params.showid
        }
    })
    const show = await Show.findByPk(request.params.showid);
    response.json(show)
})


module.exports = {app};