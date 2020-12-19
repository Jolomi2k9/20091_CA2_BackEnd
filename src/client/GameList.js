import React, { Component } from 'react';
//import the Link component to handle React Router
import { Link } from 'react-router-dom';
import Game from './Game';
//Axios is a lightweight HTTP client based on the $http service within Angular.js
//Axios provides support for request and response interceptors, transformers and auto-conversion to JSON
// Use "npm install axios" command to install
import axios from 'axios';
import './app.css';
// import stylesheet 
//MAKE SURE TO INSTALL USING npm install bulma
import 'bulma/css/bulma.css';

// this component will handle all elements in the games array
class GameList extends Component {
    constructor(props) {
        super(props);
        // store the games array in the state
        this.state = { games: [] };

        //this binding is necessary to make `this` work in the callback
        //generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method
        this.updateGame = this.updateGame.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    // fetch all games data from the server when the component mounts
    componentDidMount() {
        this.updateGame();
    }

    //
    updateGame() {
        // get the games API using axios GET request to the server 
        axios.get('api/games')
            .then(response => {
                //store the response in the state
                this.setState({ games: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleDelete(gamesId) {
        // make a DELETE request to the server which will handle the removal of the games with the specific GameId
        axios
            .delete('api/games', {
                data: {
                    id: gamesId
                }
            })
            .then(response => {
                //if the deletion was successful then re-render the list of games
                this.updateGame();
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        // produce a games component for each games object
        const gamesList = this.state.games.map(u => (
            //map through each element in the array and set to the value received from the server
            <Game
                key={u._id}
                id={u._id}
                title={u.title}
                platform={u.platform}
                developer={u.developer}
                image={u.publisher}
                year={u.year}
                //you must include the handleDelete method to use in child components
                handleDelete={this.handleDelete}
            />
        ));

        //return the list of games
        return (
            <div className="is-fluid">
                {/*Navigation bar*/}
                <nav className="navbar">
                    <h1 className="navbar-item title is-1 has-text-primary">List of Games</h1>
                    {/*when this button is pressed, CreateGame component will be rendered by using React Router*/}
                    <Link to={'/create-games'} className="navbar-item navbar-end">
                        <button className="button is-warning" type="button">Create new game</button>
                    </Link>
                </nav>
                <hr />
                {/*Game LIST*/}
                <div>
                    <div className="columns is-multiline">
                        {gamesList}
                    </div>
                </div>
                {/*FOOTER*/}
                <footer className="footer has-background-primary">
                    <div className="content has-text-centered">
                        <p className="has-text-white-bis"><strong>Random Game API</strong> styled with Bulma.</p>
                    </div>
                </footer>
            </div>

        );
    }
}

export default GameList;
