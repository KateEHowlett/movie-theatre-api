const express = require("express");
const app = express();
const {User, Show} = require("../models/index")
const {db} = require("../db/connection");
const {check, validationResult} = require("express-validator");

//User related logic
const userRouter = require("../routes/users.js");
app.use("/users",userRouter);
// Show related logic
const showRouter = require("../routes/shows.js");
app.use("/shows",showRouter);

module.exports = {app};