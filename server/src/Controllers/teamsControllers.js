const axios = require("axios");
const { Teams } = require("../db");
const { API_URL } = process.env;

const getAllTeams = async () => {
  try {
    const teamsDb = await Teams.findAll();

    if (teamsDb.length > 0) {
      return teamsDb.sort((a, b) => a.name.localeCompare(b.name));
    }

    const teamsApi = await axios.get(API_URL);
    const teams = teamsApi.data.map((e) => e.teams);

    const listaTeamsClear = [];
    for (let i = 0; i < teams.length; i++) {
      if (teams[i] === undefined) {
        listaTeamsClear.push("No hay informacion de equipo");
      } else {
        let element = teams[i].split(",");
        listaTeamsClear.push(element);
      }
    }

    const listaTeams = [];
    listaTeamsClear.map((e) => {
      for (let i = 0; i < e.length; i++) {
        if (e[i].length > 1) {
          listaTeams.push(e[i].trim());
        }
      }
    });

    const uniqueTeams = [...new Set(listaTeams)];

    const createdTeams = await Teams.bulkCreate(
      uniqueTeams.map((name) => ({ name }))
    );

    return createdTeams.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    throw new Error(`Ocurrió un error al intentar traer los equipos: ${error.message}`);
  }
};

module.exports = {
  getAllTeams,
};
