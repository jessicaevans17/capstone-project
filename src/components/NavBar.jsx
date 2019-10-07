import React from "react"
import Logo from "../images/logo.png"
import { Link } from "react-router-dom"
import { useAuth0 } from "../react-auth0-wrapper"
import DropDown from "./DropDownMenu"

const NavBar = () => {
  const { user } = useAuth0()
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
            <DropDown />
          </div>
        </nav>
      </header>
    </>
  )
}

export default NavBar
