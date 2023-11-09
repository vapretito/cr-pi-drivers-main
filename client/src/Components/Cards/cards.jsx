import React from 'react'
import Card from '../Card/card';
import "./cards.style.css"

 const cards = ({allDrivers, lastIndex, firstIndex }) => {
  const driversList = allDrivers.slice(firstIndex, lastIndex);

  return (
    <div className="cardsContainer">
    <div className="cardGrid">
      {driversList.map((driver, id) => (
        <Card key={id} driver={driver} />
      ))}
    </div>
    </div>
  );
};


 export default cards;