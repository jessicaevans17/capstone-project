import React from "react"
import { Link } from "react-router-dom"

const NavButtons = () => {
  return (
    <>
      <Link to="/new/game" className="sign-in-button">
        Start a Game
      </Link>
      <Link to="/browse/games" className="sign-in-button">
        Browse Games
      </Link>
    </>
  )
}

export default NavButtons
