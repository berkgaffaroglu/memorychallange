import React, { Component } from 'react'
import Game from './Game'
export class FetchRandomWords extends Component {
    constructor(props) {
        super(props)
        // initializing the variables that I am going to use later.
        this.state = {
            level: 1,
            score: 0,
            speed: 1,
            wordList: [],
            correctWordList: [],
            wrongWordList: [],
            gameStarted: false,
            memorizingEnded: false,
            errors: false,

        }
        this.fetchRandomWords = this.fetchRandomWords.bind(this)
        this.gameLogic = this.gameLogic.bind(this)
        this.handleNextLevel = this.handleNextLevel.bind(this)
    }


    gameLogic() {
        var correctWordList = this.state.correctWordList
        var wrongWordList = this.state.wrongWordList
        this.setState({
            wordList: correctWordList
        })
        // For each level there will be more words to memorize so we have to multiply by level to wait and the more we increase
        // the speed seconds to wait will be lesser
        var waitSeconds = this.state.level * 1000 * 3 / this.state.speed // in miliseconds
        // replacing the wordList with shuffled list which contains both correct and wrong words.
        var wordList = correctWordList.concat(wrongWordList)
        wordList = wordList.sort(() => Math.random() - 0.5);
        console.log(waitSeconds / 1000)
        setTimeout(() => {
            this.setState({
                wordList: wordList,
                memorizingEnded: true
            })
        }, waitSeconds);
    }


    // Helper function to divide the list by correct ones and wrong ones.
    handleStringManipulation(lst) {
        var correctWordList = []
        var wrongWordList = []
        lst.map(function (word) {
            // The words that ends with :C are the correct ones.
            if (word.slice(-2) == ':C') {
                let wordToPush = word.slice(0, word.length - 2)
                correctWordList.push(wordToPush)
            } else { wrongWordList.push(word) }
        })
        this.setState({
            correctWordList: correctWordList,
            wrongWordList: wrongWordList
        })
        // Calling the next function
        this.gameLogic()
    }


    async fetchRandomWords(level) {
        try {
            // Fetching 3 words for each level
            var totalWords = level * 3
            // 1 out of 3 word will be wrong which will be shown of the end of memorization
            var wrongWords = totalWords / 3
            
            let response = await (fetch(this.props.websiteUrl + `api/get-random-words/total=${totalWords}/wrong=${wrongWords}`));
            let data = await response.json();

            // We are seperating the words by their last 2 character which is ":C"
            this.handleStringManipulation(data)

            // If there is any error handle it by changing the state errors:true.
        } catch (err) {
            this.setState({ errors: true, })
        }

    }


    handleNextLevel() {
        this.setState((state) => ({ level: state.level + 1, gameStarted: true }));
        this.fetchRandomWords(this.state.level)
    }


    render() {
        // destructing this.state to have cleaner code.
        const { errors, wordList, level, score } = this.state
        // If level is 0 display start button else display next level button
        if (this.state.gameStarted == false) {
            if (level == 1) {
                var buttonElement = (<button onClick={() => this.handleNextLevel()}>Start</button>)
            }
            else { var buttonElement = (<button onClick={() => this.handleNextLevel()}>Next level</button>) }
        }

        // If the game is started don't display the next level button
        else {
            var buttonElement = (<></>)

            var endQuestions = (
                <>
                    <h1>What word didn't shown?</h1>
                    {this.state.wordList.map(function (word, index) {
                        return (
                            <a key={index} href="#">{word}</a>
                        )
                    })}
                </>
            )

        }

        if (!errors) {
            return (
                <>
                    <h1>{level - 1 != 0 ? <> Level: {level - 1} </> : <></>}</h1>
                    <h1>{level - 1 != 0 ? <> Score: {score} </> : <></>}</h1>
                    {this.state.memorizingEnded ? endQuestions : wordList}
                    <br />
                    {buttonElement}
                </>
            )
        }

        // Error handling
        else if (errors) {
            return (<>Something is wrong. Please try again.</>)
        }
    }
}

export default FetchRandomWords
