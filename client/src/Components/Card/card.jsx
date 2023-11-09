import React from 'react'
import "./card.style.css"
import { Link } from 'react-router-dom';


const card = ({driver}) => {
const { id, image, forename, surname , nationality, dob, teams} = driver

  return (
    <div className='Card'>
      
      <h1>{forename} {surname}</h1>

      
      <Link to={`/detail/${id}`}>
      <img src={image} alt={image} />
      
      <p> &#128197;		{dob}</p>
      <p> &#127950;&#65039;	{teams}</p>
      <p> &#127757;	 {nationality}</p>
      </Link>


    </div>
  )
}

export default card