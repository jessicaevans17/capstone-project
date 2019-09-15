import React, { Component } from "react"
import Logo from "./images/logo.png"
import Profile from "./images/profilepic.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDice } from "@fortawesome/free-solid-svg-icons"
const element = <FontAwesomeIcon icon={faDice} />

class App extends Component {
  render() {
    return (
      <>
        <header>
          <nav>
            <section className="logo">
              <img src={Logo} alt="Website Logo" />
            </section>
            <section className="page-nav">
              <div className="sign-in-info">
                <a href="#">Sign In / Create an Account</a>
                <img src={Profile} alt="User's Profile Picture" />
              </div>
              <div>
                <input
                  type="text"
                  className="search-bar"
                  placeholder="Search for a game."
                />
                <button className="search-button">{element}</button>
              </div>
            </section>
          </nav>
        </header>
        <main></main>
        <footer></footer>
      </>
    )
  }
}

export default App
