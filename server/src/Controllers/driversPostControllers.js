const { Driver, Teams } = require("../db");

const createDriver = async (forename, surname, description, image, nationality, dob, teams) => {
    try {
        if (
            !forename ||
            !surname ||
            !description ||
            !image ||
            !nationality ||
            !dob ||
            !Array.isArray(teams) || 
            teams.length === 0 
        ) {
            throw new Error("Faltan datos por completar");
        }

        const findDriver = await Driver.findAll({ where: { forename: forename } });
        if (findDriver.length) {
            throw new Error("El piloto ya existe");
        }

        const [newDriver, created] = await Driver.findOrCreate({
            where: {
                forename,
                surname,
                description,
                image,
                nationality: nationality.join(', '), 
                dob,
            },
        });

        if (created) {
            for (let i = 0; i < teams.length; i++) {
                let newTeam = await Teams.findOne({ where: { name: teams[i] } });
                if (newTeam) {
                    await newDriver.addTeams(newTeam); 
                }
            }
        }

        const driverWithTeams = {
            ...newDriver.toJSON(),
            teams: teams.join(", "), 
        };

        return driverWithTeams;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

module.exports = createDriver;




      
      




