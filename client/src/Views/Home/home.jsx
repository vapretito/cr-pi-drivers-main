import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"

import { getDrivers, getByName } from "../../Redux/actions";



import React from "react";
import Cards from "../../Components/Cards/cards";
import NavBar from "../../Components/NavBar/navbar";
import Pagination from "../../Components/Pagination/pagination";
import Loading from '../../Components/Loading/loading';


import "./home.style.css"


const Home = () => {

    const dispatch = useDispatch ()
    const allDrivers= useSelector((state) => state.allDrivers )
    const [searchString, setSearchString] = useState ("");

    const totalDrivers = allDrivers.length; 
const [driversPerPage, setDriversPerPage] = useState(9); 
const [currentPage, setCurrentPage] = useState(1); 
const [loadingPage, setLoadingPage] = useState(true);
const [driverNotFound, setDriverNotFound] = useState(false); 



const lastIndex = currentPage * driversPerPage;
  const firstIndex = lastIndex - driversPerPage; 

    function handleChange (e) {
        e.preventDefault ()
        setSearchString(e.target.value);
        setDriverNotFound(false);
        
      
      }

      async function handleSubmit(e) {
        e.preventDefault();
        dispatch(getByName(searchString)).then((result) => {
          if (result.type === 'GET_BY_NAME' && Array.isArray(result.payload) && result.payload.length === 0) {
            window.alert("No se encontró ningún piloto.");
          } else {
            setDriverNotFound(false);
           
          }
        });
      }

     function handleClick(e) {
        e.preventDefault ();
        dispatch(getDrivers());
      }
      
       

    useEffect (()=>{
      setLoadingPage(true);
        dispatch(getDrivers()).then(() => {
          setLoadingPage(false); 
        });
      }, [dispatch]);
    
   
    return (
        <div className="home"> 
         {loadingPage && <Loading />} { }
           
            <NavBar handleChange={handleChange} handleSubmit={handleSubmit}  driverNotFound={driverNotFound}/>
            <button onClick={handleClick} >Volver a cargar Pilotos &#10226;</button>
            
            <Cards allDrivers ={allDrivers} lastIndex={lastIndex} firstIndex={firstIndex} />
            <div>
      <Pagination
        driversPerPage={driversPerPage}
        totalDrivers={totalDrivers}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>

        </div>
    ); 
}

export default Home;

