import React from "react"
import Logo from "../images/logo.png"
import Profile from "../images/profilepic.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDice } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
const element = <FontAwesomeIcon icon={faDice} />
const HomePage = () => {
  return (
    <>
      <header>
        <nav>
          <section className="logo">
            <img src={Logo} alt="Website Logo" />
          </section>
          <section className="page-nav">
            <div className="sign-in-info">
              <a className="login" href="#">
                Sign In / Create an Account
              </a>
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
      <main>
        <section className="content">
          <h1 className="main-prompt">
            Have a board game you want to play, but no one to play it with?
          </h1>
          <Link className="sign-in-button">Start a Game</Link>
          <Link className="find-a-game-button">Browse Games Near You</Link>
        </section>
      </main>
      <footer></footer>
    </>
  )
}

export default HomePage
