import React, { Component } from 'react'

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { nickname: '', country: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('Favori meyveniz: ' + this.state.value);
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>

                    Country:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option>God</option>
                        <option>God</option>
                        <option>God</option>
                        <option>God</option>
                    </select>
                </label>
                <input type="submit" value="Gönder" />
            </form>
        );
    }
}

export default Login
