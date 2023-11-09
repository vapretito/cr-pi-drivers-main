const axios = require("axios");
require("dotenv").config();
const { API_URL, IMAGE_DEFAULT } = process.env;
const { Driver, Teams } = require('../db');

const getAPIDrivers = async () => {
    const apiData = await axios.get(API_URL);
    const drivers = apiData.data.map((driver) => {
        return {
            id: driver.id,
            forename: driver.name.forename,
            surname: driver.name.surname,
            description: driver.description,
            image: driver.image.url ? driver.image.url : IMAGE_DEFAULT,
            nationality: driver.nationality,
            dob: driver.dob,
            teams: driver.teams,
        };
    });
    return drivers;
};

const getDBDrivers = async () => {
    const dbDrivers = await Driver.findAll({
        include: {
            model: Teams,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });

    const driversWithTeams = dbDrivers.map((driver) => {
        return {
            id: driver.id,
            forename: driver.forename,
            surname: driver.surname,
            description: driver.description,
            image: driver.image,
            nationality: driver.nationality,
            dob: driver.dob,
            teams: driver.Teams.map((team) => team.name).join(', '),
        };
    });
    // console.log(driversWithTeams)

    return driversWithTeams;
};

const getAllDrivers = async () => {
    const apiDrivers = await getAPIDrivers();
    const dbDrivers = await getDBDrivers();

    const allDrivers = apiDrivers.concat(dbDrivers);
    return allDrivers;
};

module.exports = { getAllDrivers, getAPIDrivers, getDBDrivers };

