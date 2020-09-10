import React from 'react';
import logo from './logo.svg';
import './App.css';
import FetchTop10Players from './components/FetchTop10Players'
import FetchRandomWords from './components/FetchRandomWords'
function App() {
  // Declaring website url in App.js for production reasons
  const websiteUrl = 'http://localhost:8000/'
  return (
    <div className="App">
      
      <FetchRandomWords websiteUrl={websiteUrl} />
    </div>
  );
}

export default App;
