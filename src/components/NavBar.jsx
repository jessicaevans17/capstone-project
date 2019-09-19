import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDice } from "@fortawesome/free-solid-svg-icons"
import Logo from "../images/logo.png"
import Profile from "../images/profilepic.jpg"
import { Link } from "react-router-dom"
const element = <FontAwesomeIcon icon={faDice} />

const NavBar = () => {
  return (
    <>
      <header>
        <nav>
          <section className="logo">
            <Link to="/">
              <img src={Logo} alt="Website Logo" />
            </Link>
          </section>
          <section className="page-nav">
            <div className="sign-in-info">
              <Link to="/login" className="login" href="#">
                Sign In / Create an Account
              </Link>
              {/* <img src={Profile} alt="User's Profile Picture" /> */}
            </div>
            <div>
              <input
                type="text"
                className="search-bar"
                placeholder="Enter Zip Code."
              />
              <button className="search-button">{element}</button>
            </div>
          </section>
        </nav>
      </header>
    </>
  )
}

export default NavBar
