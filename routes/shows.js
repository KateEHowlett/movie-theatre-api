const express = require("express");
const router = express.Router();

// Homebrew middleware which we HOPED would validate the parameters and throw errors if they weren't correct
const checker = async function(request,response,next){
    const parameter = await String(request.params.status)
    if(parameter===""||parameter===null||parameter===undefined){
        console.log("oops: " + parameter)
        throw new Error;
    }
    console.log("yays" + parameter)
    next()
}

router.use(checker)


router.get("/", async (request,response) => {
    let shows = await Show.findAll({});
    response.json(shows);
})

router.get("/:showid", async (request,response) => {
    const showid = request.params.showid;
    const show = await Show.findByPk(showid);
    response.json(show)
})

router.get("/genres/:genre", async (request,response) => {
    const genre = request.params.genre;
    const show = await Show.findAll({where: 
        {genre:genre
        }
    });
    response.json(show)
})

router.put("/:showid/rating/:rating", async (request,response) => {
    await Show.update({rating:request.params.rating},{
        where:{
            id:request.params.showid
        }
    })
    const show = await Show.findByPk(request.params.showid);
    response.json(show)
})

// Trying out custom middleware (at top of file) to validate the parameters
router.put("/:showid/status/:status", checker, async (request,response) => {
    await Show.update({status:request.params.status},{
        where:{
            id:request.params.showid
        }
    })
    const show = await Show.findByPk(request.params.showid);
    response.json(show)
})

router.delete("/:showid", async (request,response) => {
    const deleted = await Show.findByPk(request.params.showid)
    await Show.destroy({
        where:{
            id:request.params.showid
        }
    })
    response.json(deleted);
})

module.exports = {router};