import React from 'react';
import DataVisualization from './data_visualization';
import style from './page.module.css';

const AboutUs = () => {
  console.log("AboutUs component rendered"); // Debugging log

  return (
    <>
      <div className={`${style.container} ${style.backgroundOverlay}`}>
        <DataVisualization />
      </div>
    </>
  );
};

export default AboutUs;