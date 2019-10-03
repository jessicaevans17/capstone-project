import React, { Component } from "react"
import NavBar from "./components/NavBar"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import Login from "./Pages/Login"
import BrowseGames from "./Pages/BrowseGames"
import Footer from "./components/Footer"
import CreateGame from "./Pages/CreateGame"
import Game from "./Pages/Game"
import Profile from "./components/profile"
import PrivateRoute from "./components/PrivateRoute"
import AutoSuggest from "./components/AutoSuggest"

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/browse/games" component={BrowseGames}></Route>
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/new/game" component={AutoSuggest} />
            <Route exact path="/:id" component={Game}></Route>
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App
