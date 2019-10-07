import React from "react"
import { Link } from "react-router-dom"
import { useAuth0 } from "../react-auth0-wrapper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

const DropDownMenu = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()
  console.log(user)
  const Bars = <FontAwesomeIcon icon={faBars} />
  return (
    <>
      <div className="dropdown">
        <button className="dropbtn">{Bars}</button>
        <div className="dropdown-content">
          <Link to="/browse/games">Browse Games</Link>
          <Link to="/new/game">Create a Game</Link>

          {!isAuthenticated && (
            <button className="login" onClick={() => loginWithRedirect({})}>
              Log In / Sign Up
            </button>
          )}
          {isAuthenticated && (
            <>
              <Link to="/profile">Profile</Link>
              <button className="login" onClick={() => logout({})}>
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default DropDownMenu
