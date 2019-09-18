import React, { Component } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDice } from "@fortawesome/free-solid-svg-icons"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import HomePage from "./Pages/HomePage"

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
          </Switch>
        </Router>
      </>
    )
  }
}

export default App
