const axios = require("axios");
require("dotenv").config();
const { API_URL, IMAGE_DEFAULT } = process.env;
const { Driver, Teams } = require("../db");






 const getById = async (idDriver) => {
   let IDDriver = [];

   try {
     if (idDriver && idDriver.length > 3) { 
         console.log("Executing search on database."); 
       const DbDriver = await Driver.findOne({
         where: {
           id: idDriver,
         },
         include: {
           model: Teams,
           attributes: ["name"],
           through: {
             attributes: [],
           },
         },
       });
       IDDriver.push(DbDriver.dataValues);
     }

     if (idDriver && idDriver.length < 4) { 
       const urldata = await axios(`${API_URL}/${idDriver}`);
       const { data } = urldata;

       const { id, name, image, dob, nationality, teams, description } = data;

       const apiDriver = {
         id: Number(id),
         
           forename: name.forename,
           surname: name.surname,
         
         description,
         image: image.url ? image.url : IMAGE_DEFAULT,
         nationality,
         dob,
         teams,
       };
       IDDriver.push(apiDriver);
     }

     if (IDDriver.length > 0) {
       return IDDriver[0];
     } else {
       throw new Error("ID no encontrado");
     }
   } catch (error) {
     console.error("Error en getById:", error);
     throw error;
   }
 };

 module.exports = { getById };



