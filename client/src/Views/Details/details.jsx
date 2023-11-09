import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { getById } from '../../Redux/actions';
import Loading from '../../Components/Loading/loading';
import imagenBack from "../../Components/Imagenes/flechaback1.png"


import "./details.style.css"

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedDriver = useSelector((state) => state.selectedDriver);

  useEffect(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  if (!selectedDriver) {
    return <Loading/>;
  }

  const { forename, surname, nationality, teams,description, dob, image } = selectedDriver;
  console.log(selectedDriver)

  return (
    <div>
      <div>
      <Link to={"/home"}>
    
      <img className="img-back" src={imagenBack} alt="imagenBack" />
   
  </Link>
      </div>
    <div className="details-container">
      <div className="details-header">
        <h1>{forename} {surname}</h1>
      </div>
      <div className="details-info">
      <p>Birth: {dob} &#127874;	</p>
      
      <p>Nationality: {nationality} &#127757;</p>
        
      <p>Description: {description}</p>
        
      <p>Teams: {teams}&#127950;&#65039;	</p>
      </div>
      <div className="details-image">
        <img src={image} alt={forename} />
      </div>
    </div>
    </div>
  );
}

export default Details;

 