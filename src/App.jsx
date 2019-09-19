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
            <Route exact path="/profile" component={ProfilePage}></Route>
            <Route exact path="/new/game" component={CreateGame}></Route>
            <Route exact path="/view/game" component={Game}></Route>
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App
