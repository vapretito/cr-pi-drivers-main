const { Router } = require("express");
const { getAllDriversHandler } = require ("../../Handlers/driversHandrels");
const { getIDHandlers } = require ("../../Handlers/driversIDHandrels")
const  getDriverByNameHandrel  = require ("../../Handlers/driversNameHandresls")
const postDriver =require ("../../Handlers/driversPostHandrels")




const driversRouter = Router();

driversRouter.post("/", postDriver);

driversRouter.get("/", getAllDriversHandler);

driversRouter.get ("/search", getDriverByNameHandrel);

driversRouter.get ("/:idDriver", getIDHandlers);


module.exports = {
    driversRouter
};