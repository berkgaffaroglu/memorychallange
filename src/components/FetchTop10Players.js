import React, { Component } from 'react'

export class FetchTop10Players extends Component {
    constructor(props) {
        super(props)
        // initializing the variables that I am going to use later.
        this.state = {
            projectList: [],
            Render: false,
            errors: false
        }
    }
    // Fetching top 10 players from REST Api response.
    async fetchAll() {
        try {

            let response = await (fetch(this.props.websiteUrl + 'api/top10-players/'));
            let data = await response.json();
            this.setState({
                projectList: data,
                // Rendering only if the response is okay.
                Render: true
            })

            // If there is any error handle it by changing the state Render:false and errors:true.
        } catch (err) {
            this.setState({

                errors: true,
                Render: false
            })
        }

    }
    componentWillMount() {
        // Fetching the data before render.
        this.fetchAll()
    }
    render() {
        const { Render, errors, projectList } = this.state
        // Rendering the data if this.state.Render is true as we set.
        if (Render) {

            return (
                <div>
                    {projectList.map(function (player, index) {
                        // Mapping all of the players in top 10.
                        return (
                            <div key={index}>{player.id} {player.country} {player.nickname} {player.score}</div>
                        )
                    })}
                </div>
            )

        }
        // If the data is taken too much time to load display a spinning animation.
        else if (Render == false) {
            return (
                <>Wait</>
            )
        }
        // Error handling.
        else if (errors) {
            return (
                <>Something is wrong. Please try again.</>
            )
        }



    }
}

export default FetchTop10Players
