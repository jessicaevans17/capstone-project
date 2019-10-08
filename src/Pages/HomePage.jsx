import React from "react"
import { Link } from "react-router-dom"
import Backsplash from "../images/backsplash.jpg"

const HomePage = () => {
  return (
    <>
      <main
        style={{
          backgroundImage: `url(${Backsplash})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
        className="main-homepage"
      >
        <section className="content">
          <h1 className="main-prompt">
            Want to play a board game, but have no one to play with?
          </h1>
          <Link to="/new/game" className="sign-in-button">
            Start a Game
          </Link>
          <Link to="/browse/games" className="find-a-game-button">
            Browse Games Near You
          </Link>
        </section>
      </main>
    </>
  )
}

export default HomePage
