const express = require("express");
const router = express.Router();
const {User, Show} = require("../models/index")
const {db} = require("../db/connection");


router.get("/", async (request,response) => {
    let users = await User.findAll({});
    response.json(users);
})

router.get("/:userid", async (request,response) => {
    const id = request.params.userid;
    const user = await User.findByPk(id);
    response.json(user)
})

router.get("/:userid/watched", async (request,response) => {
    const userID = request.params.userid;
    const user = await User.findByPk(userID);
    const shows = await user.getShows({joinTableAttributes:[]});
    response.json(shows);
})

router.put("/:userid/watched/:showid", async (request,response) => {
    const user = await User.findByPk(request.params.userid);
    await user.addShow(request.params.showid);
    const shows = await user.getShows({joinTableAttributes:[]});
    response.json(shows)
})

module.exports = router;