import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
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
                    <Table className="text-white">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Nickname</th>
                                <th>Country</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>

                            {projectList.map(function (player, index) {

                                // Mapping all of the players in top 10 with using table.
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{player.nickname}</td>
                                        <td>{player.country}</td>
                                        <td>{player.score}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            )

        }
        // If the data is taken too much time to load display a spinning animation.
        else if (Render === false) {
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
