import React, { Component } from 'react'
import Game from './Game'
export class FetchRandomWords extends Component {
    constructor(props) {
        super(props)
        // initializing the variables that I am going to use later.
        this.state = {
            level: 0,
            score: 0,
            speed:1,
            wordList: [],
            correctWordList: [],
            wrongWordList: [],
            gameStarted: false,
            errors: false,
        }
        this.fetchRandomWords = this.fetchRandomWords.bind(this)
        this.gameLogic = this.gameLogic.bind(this)
        this.handleNextLevel = this.handleNextLevel.bind(this)
    }

    gameLogic() {

        var correctWordList = this.state.correctWordList
        var wrongWordList = this.state.wrongWordList
        var wordList = correctWordList.concat(wrongWordList)
        wordList = wordList.sort(() => Math.random() - 0.5);
        this.setState({
            wordList: wordList
        })
        setTimeout(() => {
            this.setState({
                gameStarted: false
            })
        }, this.state.level*1000*4/this.state.speed);

    }

    // Helper function to divide the list by correct ones and wrong ones.
    handleCorrectAnswer(lst) {
        var correctWordList = []
        var wrongWordList = []
        lst.map(function (word) {
            // The words that ends with :C are the correct ones.
            if (word.slice(-2) == ':C') {
                let wordToPush = word.slice(0, word.length - 2)
                correctWordList.push(wordToPush)
            } else {
                wrongWordList.push(word)
            }
        })
        this.setState({
            correctWordList: correctWordList,
            wrongWordList: wrongWordList
        })
        this.gameLogic()

    }

    async fetchRandomWords(level) {
        try {
            var totalWords = level * 4
            var wrongWords = totalWords / 4
            let response = await (fetch(this.props.websiteUrl + `api/get-random-words/total=${totalWords}/wrong=${wrongWords}`));
            let data = await response.json();

            // We are seperating the words by their last 2 character which is ":C"
            this.handleCorrectAnswer(data)

            // If there is any error handle it by changing the state errors:true.
        } catch (err) {
            this.setState({
                errors: true,
            })
        }

    }

    handleNextLevel() {
        this.setState((state) => ({
            level: state.level + 1,
            gameStarted: true
        }));

        console.log(this.state.level)
        this.fetchRandomWords(this.state.level)

    }

    render() {
        const { errors, wordList, level } = this.state
        // If level is 0 display start button else display next level button
        if (this.state.gameStarted == false) {
            if (level == 0) {
                var buttonElement = (
                    <button onClick={() => this.handleNextLevel()}>Start</button>
                )
            } else {
                var buttonElement = (
                    <button onClick={() => this.handleNextLevel()}>Next level</button>
                )
            }
        }
        // If the game is started don't display the next level button
        else {
            var buttonElement = (
                <></>
            )
        }

        if (!errors) {
            return (
                <>
                    <h1>{level != 0 ? <> Level: {level-1} </> : <></>}</h1>
                    {wordList}
                    <br />
                    {buttonElement}
                </>
            )
        }

        // Error handling
        else if (errors) {
            return (
                <>Something is wrong. Please try again.</>
            )
        }
    }
}

export default FetchRandomWords
