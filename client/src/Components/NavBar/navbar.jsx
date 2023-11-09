import React from 'react'
import { Link } from "react-router-dom";
import "./navbar.style.css"
import image from "../../Components/Imagenes/formula-1-logo-7.png";
import OrderByName from "../../Components/Filters/filterbyName";
import FilterTeams from "../../Components/Filters/filterTeams";
import FilterOrigin from "../../Components/Filters/filterbyOrigin"
import OrderByBirth from "../../Components/Filters/orderbyBirth"
import imagen from "../Imagenes/conductor.png"

const NavBar = ({ handleChange, handleSubmit,  }) => {

  return (
    <div className='navBar'>
      <div>
        <Link to={"/"}>
          <img className= "logoo" src={image} alt="Logo" />
        </Link>
      </div>
      <div>
  <Link to={"/create"}>
    <figure>
      <img className="create-img" src={imagen} alt="create" />
      <figcaption style={{ fontSize: "20px", textAlign: "center"}}>Create</figcaption>
    </figure>
  </Link>
</div>
      <div className='search-box'>
  <form onChange={handleChange}>
    <input placeholder="Busqueda.." type="search" />
    <button type="submit" onClick={handleSubmit}>Buscar</button>
  </form>
  
</div>
      <div className='filter-container'>
        <OrderByName />
        <OrderByBirth />
        <FilterTeams />
        <FilterOrigin />
      </div>
    </div>
  );
};

export default NavBar;
