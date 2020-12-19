import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
//import required components
import CreateGame from './CreateGame';
import EditGame from './EditGame';
import GameList from './GameList';

// this is the "main" component which sets up the React Router and respective routes
const App = () => {
  return(
    <HashRouter>
      <div>
        {/*SERVERSIDE: Link the routes to components*/}
        <Route exact path="/" component={GameList}/>
        {/*pass the id through the EditGame component*/}
        <Route path="/edit-games/:id" component={EditGame}/>
        {/*set the path to create a new Game to CreateGame component*/}
        <Route path="/create-games" component={CreateGame}/>
      </div>
    </HashRouter>
  );
};

export default App;
