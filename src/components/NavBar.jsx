import React from "react"
import Logo from "../images/logo.png"
import { Link } from "react-router-dom"
import { useAuth0 } from "../react-auth0-wrapper"
const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()
  console.log(user)
  return (
    <>
      <header>
        <nav>
          <section className="logo">
            <Link to="/">
              <img src={Logo} alt="Website Logo" />
            </Link>
          </section>
          <div className="right-side-navlinks">
            <section className="nav-create-game">
              <Link to="/new/game">Create a Game</Link>
            </section>
            <section className="page-nav">
              <div className="sign-in-info">
                {!isAuthenticated && (
                  <button
                    className="login"
                    onClick={() => loginWithRedirect({})}
                  >
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
            </section>
          </div>
        </nav>
      </header>
    </>
  )
}

export default NavBar
