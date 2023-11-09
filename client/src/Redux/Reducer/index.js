import { GET_DRIVERS,  GET_BY_NAME, GET_BY_ID, GET_TEAMS,TEAMS_FILTER, ORIGIN_FILTER, ORDER_BY_BIRTH, ORDER_BY_NAME, GET_NATIONALITY} from "../actions"

let initialState ={  allDrivers:[], driversCopy: [], driver: {}, filteredDrivers: [], teams: [], filteredTeams: [], nationality: [] }

function rootReducer (state = initialState, action){
    switch (action.type){
        case GET_DRIVERS:
            return{
                ...state,
                allDrivers:action.payload,
                driversCopy: action.payload

            };
            case GET_BY_NAME:
                return{
                    ...state,
                    allDrivers: action.payload
    
                }
                case GET_BY_ID: 
               return {
        ...state,
        selectedDriver: action.payload,
      };    

      case GET_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };
      case TEAMS_FILTER:
      let filterByTeam;
      action.payload === "AllTeams"
        ? (filterByTeam = state.driversCopy)
        : (filterByTeam = state.driversCopy.filter(
            (driver) =>
              driver.teams && driver.teams.includes(action.payload)
          ));
      return {
        ...state,
        allDrivers: [...filterByTeam],
      };

    case ORIGIN_FILTER:
      let filterByOrigin;
      action.payload === "AllOrigins"
        ? (filterByOrigin = state.driversCopy)
        : action.payload === "API"
        ? (filterByOrigin = state.driversCopy.filter(
            (driver) => typeof driver.id === "number"
          ))
        : (filterByOrigin = state.driversCopy.filter(
            (driver) => typeof driver.id !== "number"
          ));

      return {
        ...state,
        allDrivers: [...filterByOrigin],
      };

    case ORDER_BY_NAME:
      let orderNames = state.allDrivers.slice(); // Usamos state.allDrivers en lugar de state.driversCopy
      const sortOrder = action.payload === "Descendente" ? -1 : 1;

      orderNames.sort((a, b) => {
        const nameA = a.forename?.toLowerCase();
        const nameB = b.forename?.toLowerCase();
        return sortOrder * nameA.localeCompare(nameB);
      });

      return {
        ...state,
        allDrivers: [...orderNames],
      };

    case ORDER_BY_BIRTH:
      let orderByBirth = state.allDrivers.slice(); // Usamos state.allDrivers en lugar de state.driversCopy
      const isDescending = action.payload === "Descendente";

      orderByBirth.sort((a, b) => {
        const dateA = new Date(a.dob);
        const dateB = new Date(b.dob);

        if (isDescending) {
          return dateB - dateA;
        } else {
          return dateA - dateB;
        }
      });

      return {
        ...state,
        allDrivers: orderByBirth,
      };

        case GET_NATIONALITY:
      
        return {
          ...state,
          nationality: action.payload,
        };
        // case FILTER_NATIONALITY:
        //   let filterByNationality; 
        //   filterByNationality = state.driversCopy.filter(
        //     (driver) => driver.nationality === action.payload
        //   )
        //   console.log(filterByNationality)

        //   return {
        //     ...state,
        //     allDrivers:[...filterByNationality]
        //   }
  

    
            default:
                return state  
          
    }
    
}

export default rootReducer