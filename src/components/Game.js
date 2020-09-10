import React, { Component } from 'react'

export class Game extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        const { correctWordList, wrongWordList } = this.props
        return (
            <div>
                {correctWordList}
                {wrongWordList}
            </div>
        )
    }
}

export default Game
