import React from 'react';

const PlanetCard = ({ planet }) => {
  return (
    <div className="planet-card">
      <h3>{planet.name}</h3>
      <p><strong>Star:</strong> {planet.star}</p>
      <p><strong>Discovery Year:</strong> {planet.discoveryYear}</p>
    </div>
  );
};

export default PlanetCard;
