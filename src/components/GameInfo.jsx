import React from "react"
import { Link } from "react-router-dom"

const GameInfo = () => {
  return (
    <>
      <div className="game-info">
        <Link to="/view/game">
          <h2>Settlers of Catan</h2>
          <p>
            <strong>Location:</strong> Hawthorne Bottle Shop
          </p>
          <p>
            <strong>Date and Time:</strong> Saturday, October 5, 2019 at 12:00pm
          </p>
          <p>
            <strong>Players still needed?</strong> Yes
          </p>
        </Link>
      </div>
    </>
  )
}

export default GameInfo
