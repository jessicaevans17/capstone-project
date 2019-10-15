import React, { Component } from "react"
import NavBar from "./components/NavBar"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import BrowseGames from "./Pages/BrowseGames"
import CreateGame from "./Pages/CreateGame"
import Game from "./Pages/Game"
import Profile from "./components/Profile"
import PrivateRoute from "./components/PrivateRoute.jsx"
import User from "./Pages/User"

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route exact path="/browse/games" component={BrowseGames}></Route>
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/new/game" component={CreateGame} />
            <Route exact path="/:id" component={Game}></Route>
            <Route exact path="/user/profile/:id" component={User}></Route>
          </Switch>
        </Router>
      </>
    )
  }
}

export default App
