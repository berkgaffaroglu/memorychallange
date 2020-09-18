import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import GameManager from './components/GameManager';
function App() {
  // Declaring website url in App.js for production reasons
  const websiteUrl = 'http://localhost:8000/'
  return (
    <div className="App">
      <h1 className="text-white">
      <strong>MEMORY CHALLANGE</strong>
      </h1>
        <div className="container wrapper"> 
          <GameManager websiteUrl={websiteUrl} />
        </div>  
    </div>
  );
}

export default App;
