import React from "react"
import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <>
      <main>
        <section className="content">
          <h1 className="main-prompt">
            Have a board game you want to play, but no one to play it with?
          </h1>
          <Link to="/login" className="sign-in-button">
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
