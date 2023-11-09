// actions.js
import axios from "axios"



export const GET_DRIVERS = "GET_DRIVERS"
export const GET_BY_NAME = "GET_BY_NAME"
export const GET_BY_ID = "GET_BY_ID"
export const GET_TEAMS = "GET_TEAMS"
export const TEAMS_FILTER = "TEAMS_FILTER"
export const ORIGIN_FILTER = "ORIGIN_FILTER"
export const ORDER_BY_BIRTH = "ORDER_BY_BIRTH"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const GET_NATIONALITY = "GET_NATIONALITY";





export function getDrivers (){
    return async function (dispatch){
        
        const response = await axios ("http://localhost:3001/drivers/");
        return dispatch({
            type: "GET_DRIVERS",
            payload: response.data
        })
    };
}
    export function getByName (forname){
        return async function (dispatch){
            const response = await axios (`http://localhost:3001/drivers/search?name=${forname}`);

            return dispatch({
                type: "GET_BY_NAME",
                payload: response.data
                
            })
        };

    }
    export function getById(id) {
        return async function (dispatch) {
          try {
            const response = await axios.get(`http://localhost:3001/drivers/${id}`);
            const data = response.data; 
            const filteredData = {
              id: data.id,
              forename: data.forename,
              surname:data.surname,
              description: data.description,
              image: data.image,
              nationality: data.nationality,
              dob:data.dob,
              teams:data.teams
            };
      
            return dispatch({
              type: GET_BY_ID,
              payload: filteredData,
            });
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        
      };

      export const getTeams = () => {
        const endpoint = "http://localhost:3001/teams";
      
        return async (dispatch) => {
          try {
            const response = await axios.get(endpoint);
            const teamNames = response.data.map((team) => team.name);
            dispatch({
              type: GET_TEAMS,
              payload: teamNames,
            });
          } catch (error) {
            console.error(error);
          }
        };
      };
      export const postDriver = (driver) => async () => {

        try {
      
           const response = await axios.post(`http://localhost:3001/drivers`, driver);
          
          return response;
          
        } catch (error) {
          return error;
        }
      };

      export const teamsFilter = (selectedteam) => {
        return {
          type: TEAMS_FILTER,
          payload: selectedteam,
        };
      };
    
      export const originFilter = (origin) => {
        return {
          type: ORIGIN_FILTER,
          payload: origin,
        };
      };
    
      export const orderByName = (order) => {
        return {
          type: ORDER_BY_NAME,
          payload: order,
        };
      };
      export const orderByBirth = (order) => {
        return {
          type: ORDER_BY_BIRTH,
          payload: order,
        };
      };
      export const getNationality = () => async (dispatch) => {
        try {
          const response = await axios.get(`http://localhost:3001/drivers`);
          const allDrivers = response.data;
      
          const allNationality = allDrivers.flatMap((driver) => {
            if (typeof driver.nationality === 'string') {
              return driver.nationality.split(', ');
            }
            return [];
          });
      
          const uniqueNationality = [...new Set(allNationality)];
      
          const nationalityList = uniqueNationality
            .map((nationality) => ({
              name: nationality,
            }))
            .sort((a, b) => a.name.localeCompare(b.name)); 
      
          const additionalNationalities = [
            { name: 'Other' },
            // { name: 'Nigerian' },
          ];
      
          const mergedNationalities = [...nationalityList, ...additionalNationalities];
      
          dispatch({
            type: 'GET_NATIONALITY',
            payload: mergedNationalities,
          });
        } catch (error) {
          console.error(error);
        }
      };
      // export const filterByNationality  = (origin) => {
      //   return {
      //     type: FILTER_NATIONALITY,
      //     payload: origin,
      //   };
      // };


    

