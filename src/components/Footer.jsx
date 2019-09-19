import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTwitter,
  faInstagram,
  faFacebook
} from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
  const Twitter = <FontAwesomeIcon icon={faTwitter} />
  const Instagram = <FontAwesomeIcon icon={faInstagram} />
  const Facebook = <FontAwesomeIcon icon={faFacebook} />
  return (
    <>
      <footer>
        <a href="https://twitter.com/home">{Twitter}</a>
        <a href="https://facebook.com">{Facebook}</a>
        <a href="https://instagram.com"> {Instagram}</a>
      </footer>
    </>
  )
}

export default Footer
