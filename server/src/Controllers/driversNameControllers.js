const axios = require('axios');
const { Driver } = require('../db');
const { Op } = require('sequelize');
const { IMAGE_DEFAULT } = process.env;

const getByName = async (name) => {
    try {
        const nameDriver = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

        const driverNameSearch = await Driver.findAll({
            where: {
                forename: {
                    [Op.iLike]: `%${name}%`,
                },
            },
            limit: 15,
        });

        const nameDb = driverNameSearch?.map((driver) => driver.dataValues);

        const URL = `http://localhost:5000/drivers?name.forename=${nameDriver}`;
        const data = (await axios.get(`${URL}`)).data;

        if (data.length === 0 && nameDb.length === 0) 
            return []; 
        

        const newData = data.map((driver) => ({
            id: driver.id,
            forename: driver.name.forename,
            surname: driver.name.surname,
            image: driver.image.url ? driver.image.url : IMAGE_DEFAULT,
            dob: driver.dob,
            nationality: driver.nationality,
            teams: driver.teams,
        }));

        const filtrado = newData.filter((driver) =>
            driver.forename.toLowerCase() === name.toLowerCase()
        );

        const completado = 15 - driverNameSearch.length;
        const listName = filtrado.slice(0, completado);

        return [...nameDb, ...listName];
    } catch (error) {
        console.error(error);
        return []; 
    }
};

module.exports = { getByName };
