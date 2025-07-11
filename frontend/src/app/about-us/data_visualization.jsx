import React from 'react';
import DataVisualization1 from './data_visualization1';
import DataVisualization2 from './data_visualization2';
import DataVisualization3 from './data_visualization3';
import style from './page.module.css';

const DataVisualization = () => {
  return (
    <div className={style.scrollContainer}>
      <DataVisualization1 />
      <DataVisualization3 />
      <DataVisualization2 />
    </div>
  );
};

export default DataVisualization;