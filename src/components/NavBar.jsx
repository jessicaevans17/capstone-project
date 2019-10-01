import React from "react"
import Logo from "../images/logo.png"
import { Link } from "react-router-dom"
import { useAuth0 } from "../react-auth0-wrapper"
const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()
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
                    Log in
                  </button>
                )}
                {isAuthenticated && (
                  <button className="login" onClick={() => logout({})}>
                    Log out
                  </button>
                )}
                {isAuthenticated && (
                  <span>
                    <Link to="/">Home</Link>&nbsp;
                    <Link to="/profile">Profile</Link>
                  </span>
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
