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
      <div class="dropdown">
        <button class="dropbtn">{Bars}</button>
        <div class="dropdown-content">
          <Link to="/new/game">Create a Game</Link>

          {!isAuthenticated && (
            <button className="login" onClick={() => loginWithRedirect({})}>
              Log In / Sign Up
            </button>
          )}
          {isAuthenticated && (
            <>
              <Link to="/profile">
                {/* <img src={user.picture} alt={user.name} /> */}
                Profile
              </Link>
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
