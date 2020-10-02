import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Game from './components/Game'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {HiCode} from 'react-icons/hi'
import {BiLinkExternal} from 'react-icons/bi'


export class App extends Component {
  render() {
    const websiteUrl = 'http://memorychallange.herokuapp.com/'
    return (
      <div className="App">
        <div>
          <strong><h1 className="gameHeader mt-4 mb-4 text-white">
            MEMORY CHALLANGE 
              <span>
              <h5 className="text-white">Created by <a className="text-warning" href="http://berkgaffaroglu.com/" target="_blank"><BiLinkExternal />Berk Gaffaroglu</a>
              </h5>
              </span>
          </h1></strong>
        </div>

        <div className="container wrapper">
          <Router>
            <Switch>
              <Route path="/" component={(props) => <Game websiteUrl={websiteUrl} />} />
            </Switch>
          </Router>
        </div>
        <button onClick={()=> window.open("https://github.com/berkgaffaroglu/memorychallange", "_blank")} style={{fontFamily:"ConcertOne", minWidth:"250px"}} className="btn btn-lg bg-dark text-white mb-4 mt-4"><b><HiCode /> THE CODE</b></button>
        <footer className="footer sticky-bottom text-white text-center">
          <div>
            <span style={{ fontFamily: "Oswald" }}>Powered by <a style={{ color: "#c2f2cf" }} href="https://www.django-rest-framework.org/" target="_blank">Django Rest API</a> & <a style={{ color: "#c2f2cf" }} href="https://reactjs.org/" target="_blank">React.js</a>
            </span>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
