import React, { Component } from 'react'
export class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            level: 1,
            score: 0,
            wrongWordCount: 0,
            wordList: [],
            correctWordList: [],
            wrongWordList: [],
            levelStarted: false,
            memorizingEnded: false,
            final: false,
            errors: false,
        }
        this.handleCorrectAnswers = this.handleCorrectAnswers.bind(this)
        this.fetchWords = this.fetchWords.bind(this)
        this.handleLists = this.handleLists.bind(this)
        this.handleNextLevel = this.handleNextLevel.bind(this)

    }

    Countdown(waitSeconds) {
        const countDownElement = document.getElementById("countdown")
        const pluralElement = document.getElementById("plural")
        if (countDownElement != null) {
            var countdown = setInterval(() => {
                waitSeconds--;
            if (waitSeconds <= 0) { clearInterval(countdown)}
                else if (waitSeconds <= 1) { pluralElement.innerHTML = ' second' }
                else { pluralElement.innerHTML = ' seconds' }
                countDownElement.innerHTML = waitSeconds
            }, 1000);
        }
        else { return -1 }
    }


    handleNextLevel() {
        
        const { level } = this.state
        var finalLevel = 5
        // If current level is equal to finalLevel+1 that means player finished the finalLevel.
        if (level == finalLevel + 1) { this.setState({ levelStarted: false, final: true }); return -1 }
        else {
            this.setState((state) => ({ level: state.level + 1, levelStarted: true, final: false }));
            this.fetchWords(level)
        }
    }

    async fetchWords(level) {
        try {
            var totalWords = level * 3
            var wrongWords = totalWords / 3
            let response = await (fetch(this.props.websiteUrl + `api/get-random-words/total=${totalWords}/wrong=${wrongWords}`));
            let data = await response.json();
            this.handleStrings(data)
        } catch (err) { this.setState({ errors: true, }) }
    }
    handleStrings(lst) {
        var correctWordList = []
        var wrongWordList = []
        lst.map(function (word) {
            // The words that ends with :C are the correct ones.
            if (word.slice(-2) == ':C') {
                let wordToPush = word.slice(0, word.length - 2)
                correctWordList.push(wordToPush)
            } else { wrongWordList.push(word) }
        })
        this.setState({ correctWordList: correctWordList, wrongWordList: wrongWordList })
        this.handleLists()
    }

    handleLists() {
        const { wrongWordList, correctWordList, level } = this.state
        // In the first stage we are giving the list correctWordList as wordList
        this.setState({ wordList: correctWordList })
        // For each level there will be more words to memorize so we have to multiply by level.
        var waitSeconds = level * 3000  
        var wordList = correctWordList.concat(wrongWordList)
        wordList = wordList.sort(() => Math.random() - 0.5);
        // When the timer ends wordList will be the concatenation of correctWordList and wrongWordList in shuffled list
        setTimeout(() => { this.setState({ wordList: wordList, memorizingEnded: true }) }, waitSeconds);
        this.Countdown(waitSeconds / 1000)
    }

    handleCorrectAnswers(e) {
        const { wrongWordList, wrongWordCount, score } = this.state
        
        // Disabling the button so the player doesn't click the button more than 1
        if (e.target.id == "used") { return -1 }
        // Looping through the list to check if the answer is in the wrongWordList
        var isWordInTheList = false
        for (let i = 0; i < wrongWordList.length; i++) {
            if (e.target.innerHTML == wrongWordList[i]) { isWordInTheList = true }
        }
        // If the answer is correct
        if (isWordInTheList) {
            e.target.className = "btn btn-success text-white mr-2";
            e.target.id = "used";
            // Callback function to check if the game is ended
            this.setState((state) => ({ score: state.score + 10, wrongWordCount: state.wrongWordCount - 1 }), () => {
                this.isLevelEnded()

            });
        }
        else {
            e.target.className = "btn btn-danger text-white mr-2";
            e.target.id = "used";
            this.setState((state) => ({ score: state.score - 10 }));
        }
        // If wrongWordList's length + (-wrongWordCount) is equal to 0 that means there is no words to choose anymore.
        if (wrongWordList.length + wrongWordCount == 0) { this.setState({ levelStarted: false, memorizingEnded: true, wrongWordCount: 0 }) }
    }

    isLevelEnded() {
        const { wrongWordList, wrongWordCount } = this.state
        // If wrongWordList which is the correct answer list for our game length + 
        // (-wrongWordCount) is equal to 0, that means there is no correct word to choose
        // anymore. So we end the level. 
        if (wrongWordList.length + wrongWordCount == 0) {
            setTimeout(() => {
                this.setState({ levelStarted: false, memorizingEnded: false, wrongWordCount: 0, wordList: [] })
            }, 500);
        }
    }

    render() {
        const { errors, wordList, level, score, levelStarted, memorizingEnded, final } = this.state
        const { nickname } = this.props
        console.log("------------------")
        console.log("errors:", errors)
        console.log("level:", level)
        console.log("levelStarted:", levelStarted)
        console.log("memorizingEnded:", memorizingEnded)
        console.log("final:", final)
        // If the game is started don't display the next level button
        if (levelStarted) {
            buttonElement = <></>
            var wordsToMemorize = (
                <>
                    <h3 className="text-white">Try to memorize!</h3>
                    <hr className="separator" />
                    <div className="wordsToMemorize">
                        {wordList.map(function (word, index) {
                            // if index is equal to wordlist's length minus 1 that means word is the last element so we don't need the put coma.
                            return (<strong key={index}><p className="text-white d-inline" >{word}{index != wordList.length - 1 ? <>, </> : <></>}</p></strong>)
                        })}
                    </div>
                </>
            )
            var endQuestions = (
                <>
                    <h3 className="text-white">What word didn't shown?</h3>
                    <div>
                        {wordList.map((word, index) => {
                            return (<button className="btn btn-info text-white mr-2" key={index} onClick={(e) => this.handleCorrectAnswers(e)}>
                                {word}
                            </button>)
                        })}
                    </div>
                </>
            )
        }
        else if(!levelStarted && !final) {
            if (level == 1) {
                var buttonElement = (<><h3 className="text-white">Click the button if you want to start.</h3><button className="btn btn-lg btn-danger text-white" onClick={() => this.handleNextLevel()}>START</button></>)
            } else { 

                var buttonElement = (<button className="btn btn-lg btn-success text-white" onClick={() => this.handleNextLevel()}>NEXT LEVEL</button>) }
        }

        if (!errors) {
            var waitSeconds = level * 3
            if (final) {
                return (
                    <div>
                        <h3 className="text-white">Click the button if you want to finish with the score {score} {nickname != '' ? <>, Mr {nickname}</> : ""}</h3>
                        <button className="btn btn-lg btn-danger text-white ">FINISH</button>
                    </div>
                )
            }
            return (
                <div>
                    <div className="row">
                        <div className="col">
                            <h3 className="text-white" >{level - 1 != 0 ? <strong> Level: {level - 1} </strong> : <></>}</h3>
                        </div>
                        <div className="col">
                            <h3 className="text-white">{level - 1 != 0 ? <strong>Time: <span id="countdown">{waitSeconds}</span><span id="plural"> seconds</span></strong> : <></>}</h3>
                        </div>
                        <div className="col">
                            <h3 className="text-white">{level - 1 != 0 ? <strong> Score: {score} </strong> : <></>}</h3>
                        </div>
                    </div>
                    <div className="container">
                        {memorizingEnded ? endQuestions : wordsToMemorize}
                        {buttonElement}
                    </div>
                </div>
            )
        }

        if (errors) {
            return (
                <div>
                    <h3 className="text-white text-center">Something is wrong. Please try again.</h3>
                    <a className="btn btn-lg btn-success text-white ">TRY AGAIN</a>
                </div>
            )
        }
    }
}

export default Game
