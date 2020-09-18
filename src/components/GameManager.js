import React, { Component } from 'react'
import Game from './Game'
import FetchTop10Players from './FetchTop10Players'
import Login from './Login'
import Final from './Final'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export class GameManager extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nickname: '',
            country: '',
            score: 0
        }

    }
    componentDidMount(){
        this._isMounted = true
    }
    componentWillUnmount(){
        this._isMounted = false
    }
    updateScore(score) {
        if(this._isMounted) {
        this.setState({
            score: score
        })
    }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.score === nextState.score
    }
    render() {

        return (
            <>
                <Router>
                    <Switch>
                        <Route path="/" exact component={(props) => <Login />} />
                        <Route path="/top10players" exact component={(props) => <FetchTop10Players websiteUrl={this.props.websiteUrl} />} />
                        <Route path="/game" component={(props) => <Game nickname={this.state.nickname} updateScore={this.updateScore.bind(this)} websiteUrl={this.props.websiteUrl} />} />
                        <Route path="/final" component={(props) => <Final nickname={this.state.nickname} country={this.state.country} score={(score) => this.state.score(score)} />} />


                        <FetchTop10Players websiteUrl={this.props.websiteUrl} />
                    </Switch>
                </Router>
            </>
        )
    }
}

export default GameManager
