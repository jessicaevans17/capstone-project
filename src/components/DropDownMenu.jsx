import React from "react"
import { Link } from "react-router-dom"
import { useAuth0 } from "../react-auth0-wrapper"

const DropDownMenu = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()
  console.log(user)
  return (
    <>
      <div class="dropdown">
        <button class="dropbtn">Menu</button>
        <div class="dropdown-content">
          <Link to="/new/game">Create a Game</Link>
          <div className="sign-in-info">
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
              </>
            )}
            {isAuthenticated && (
              <button className="login" onClick={() => logout({})}>
                Log out
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default DropDownMenu
