import React from 'react';
import logo from './logo.svg';
import './App.css';
import FetchTop10Players from './components/FetchTop10Players'
import Game from './components/Game'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  // Declaring website url in App.js for production reasons
  const websiteUrl = 'http://localhost:8000/'
  return (
    <div className="App">
      <div className="container mt-5 wrapper">
      <Game websiteUrl={websiteUrl} />
      </div>
    </div>
  );
}

export default App;
