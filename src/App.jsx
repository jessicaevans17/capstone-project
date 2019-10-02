import React, { Component } from "react"
import NavBar from "./components/NavBar"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import Login from "./Pages/Login"
import BrowseGames from "./Pages/BrowseGames"
import Footer from "./components/Footer"
import ProfilePage from "./Pages/ProfilePage"
import CreateGame from "./Pages/CreateGame"
import Game from "./Pages/Game"
import BackSplash from "./images/backsplash.jpg"
import { useAuth0 } from "./react-auth0-wrapper"
import Profile from "./components/profile"
import PrivateRoute from "./components/PrivateRoute"

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
            <PrivateRoute path="/new/game" component={CreateGame} />
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App
