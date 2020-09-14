import React, { Component } from 'react'
export class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            level: 1,
            score: 0,
            speed: 1,
            wrongWordCount: 0,
            wordList: [],
            correctWordList: [],
            wrongWordList: [],
            gameStarted: false,
            memorizingEnded: false,
            errors: false,


        }
        this.handleCorrectAnswers = this.handleCorrectAnswers.bind(this)
        this.fetchRandomWords = this.fetchRandomWords.bind(this)
        this.gameLogic = this.gameLogic.bind(this)
        this.handleNextLevel = this.handleNextLevel.bind(this)

    }


    Countdown(waitSeconds) {
        if (document.getElementById("countdown") != null) {
            var countdown = setInterval(() => {
                waitSeconds--;
                if(waitSeconds <= 1){
                    document.getElementById("plural").innerHTML = ' second'
                }else {
                    document.getElementById("plural").innerHTML = ' seconds'
                }
                if (waitSeconds <= 0) {
                    clearInterval(countdown)
                }
                document.getElementById("countdown").innerHTML = waitSeconds
            }, 1000);
        }
        else {
            return -1
        }
    }

    isGameEnded() {
        if (this.state.wrongWordList.length + this.state.wrongWordCount == 0) {
            // end the level if there is no word to display after 2 seconds.
            setTimeout(() => {
                this.setState({
                    gameStarted: false,
                    memorizingEnded: false,
                    wrongWordCount: 0,
                    wordList: []
                })
            }, 500);


        }
    }

    handleCorrectAnswers(e) {
        // Disabling the button so the player doesn't click the button more than 1
        if (e.target.id == "used") {
            return -1
        }
        // Looping through the list to check if the answer is in the wrongWordList
        var wrongWordList = this.state.wrongWordList
        var isWordInTheList = false
        for (let i = 0; i < wrongWordList.length; i++) {
            if (e.target.innerHTML == wrongWordList[i]) {
                isWordInTheList = true
            }
        }

        // If the answer is correct
        if (isWordInTheList) {
            e.target.className = "btn btn-success text-white mr-2";
            e.target.id = "used";
            // Callback function to check if the game is ended
            this.setState((state) => ({ score: state.score + 10, wrongWordCount: state.wrongWordCount - 1 }), () => this.isGameEnded());
        }
        // If the answer is wrong
        else {
            e.target.className = "btn btn-danger text-white mr-2";
            e.target.id = "used";
            this.setState((state) => ({ score: state.score - 10 }));
        }
        // If wrongWordList's length + (-wrongWordCount) is equal to 0 that means there is no words to choose anymore.

        if (this.state.wrongWordList.length + this.state.wrongWordCount == 0) {

            // end the level if there is no word to display.
            this.setState({
                gameStarted: false,
                memorizingEnded: true,
                wrongWordCount: 0
            })

        }

    }

    gameLogic() {
        var correctWordList = this.state.correctWordList
        var wrongWordList = this.state.wrongWordList

        // In the first stage we are giving the list correctWordList as wordList
        this.setState({
            wordList: correctWordList,
        })
        // For each level there will be more words to memorize so we have to multiply by level to wait and the more we increase
        // the speed seconds to wait will be lesser
        var waitSeconds = this.state.level * 1000 * 3 / this.state.speed // in miliseconds
        var wordList = correctWordList.concat(wrongWordList)
        wordList = wordList.sort(() => Math.random() - 0.5);
        // When the timer ends wordList will be the concatenation of correctWordList and wrongWordList in shuffled list
        setTimeout(() => {
            this.setState({
                wordList: wordList,
                memorizingEnded: true
            })
        }, waitSeconds);
        this.Countdown(waitSeconds / 1000)

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
            var totalWords = level * 3
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
        // The next level will be state.level (which is previous value of level) +1 
        // And changing the gameStarted status to true

        this.setState((state) => ({ level: state.level + 1, gameStarted: true }));
        // After changing gameStarted status to true calling the fetchRandomWords function with this.state.level which
        // we handled before.

        this.fetchRandomWords(this.state.level)
    }

    render() {

        // destructing this.state to have cleaner code.
        const { errors, wordList, level, score } = this.state
        // If level is 0 display start button else display next level button
        if (this.state.gameStarted == false) {
            if (level == 1) {
                var buttonElement = (<><h3 style={{ fontSize: ".75em" }} className="text-white">Click the button if you want to start.</h3><button className="btn btn-lg btn-danger text-white" style={{ fontSize: "300px" }, { width: "200px" }} onClick={() => this.handleNextLevel()}>Start</button></>)
            }
            else { var buttonElement = (<button className="btn btn-lg btn-success text-white" style={{ fontSize: ".4em" }, { width: "200px" }} onClick={() => this.handleNextLevel()}>Next level</button>) }
        }

        // If the game is started don't display the next level button
        else {
            var buttonElement = (<></>)

            var wordsToMemorize = (
                <>
                    <h3 style={{ fontSize: ".75em" }} className="text-white">Try to memorize!</h3>
                    <hr className="separator" />
                    <div className="wordsToMemorize">
                        {wordList.map(function (word, index) {
                            // if index is equal to wordlist's length minus 1 that means word is the last element so we don't need the put coma.
                            return (
                                <strong><p style={{ fontSize: ".5em" }} className="text-white d-inline" key={index}>{word} 
                            
                                {index != wordList.length-1 ? <>, </> : <></>}
                                
                                </p></strong>
                            )
                        })}
                    </div>
                </>
            )

            var endQuestions = (
                <>
                    <h3 style={{ fontSize: ".75em" }} className="text-white">What word didn't shown?</h3>
                    <div>
                        {wordList.map((word, index) => {
                            return (
                                <button style={{ fontSize: ".5em" }} className="btn btn-info text-white mr-2" key={index} onClick={(e) => this.handleCorrectAnswers(e)}>{word}</button>
                            )
                        })}
                    </div>
                </>
            )

        }

        if (!errors) {
            var waitSeconds = this.state.level * 1000 * 3 / this.state.speed
            return (
                <>
                    <div className="row mt-5">
                        <div className="col">
                            <h3 className="text-white" >{level - 1 != 0 ? <strong> Level: {level - 1} </strong> : <></>}</h3>
                        </div>
                        <div className="col">
                            <h3 className="text-white">{level - 1 != 0 ? <strong>Time: <span id="countdown">{waitSeconds / 1000}</span><span id="plural"> seconds</span></strong> : <></>}</h3>
                        </div>
                        <div className="col">
                            <h3 className="text-white">{level - 1 != 0 ? <strong> Score: {score} </strong> : <></>}</h3>
                        </div>
                    </div>
                    <div className="container mt-5">
                        {this.state.memorizingEnded ? endQuestions : wordsToMemorize}
                        {buttonElement}
                    </div>


                </>
            )
        }

        // Error handling
        else if (errors) { return (<>Something is wrong. Please try again.</>) }
    }
}

export default Game
