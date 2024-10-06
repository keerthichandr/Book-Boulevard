import React from 'react';
import './LoadingIndicator.css';

const LoadingIndicator = ({ progress }) => {
  return (
    <div className="loading-container">
      <div className="loading-indicator">
        <div className="loading-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingIndicator;