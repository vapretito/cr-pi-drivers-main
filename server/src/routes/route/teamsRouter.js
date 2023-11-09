const { Router } = require("express");
const { getAllTeamsHandrels } = require ("../../Handlers/teamsHandrel")





const teamsRouter = Router();

teamsRouter.get("/", getAllTeamsHandrels);



module.exports = {
    teamsRouter
};